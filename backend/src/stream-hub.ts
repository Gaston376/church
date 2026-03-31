export class StreamHub {
  private sessions: Map<WebSocket, { role: "broadcaster" | "viewer"; id: string; name: string }> = new Map();
  private broadcaster: WebSocket | null = null;
  private streamInfo: { title: string; description: string } | null = null;
  private comments: { id: string; name: string; text: string; time: string }[] = [];
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const role = url.searchParams.get("role") as "broadcaster" | "viewer" | null;
    const name = url.searchParams.get("name") || "Guest";

    // REST: stream status
    if (url.pathname.endsWith("/status")) {
      return new Response(JSON.stringify({
        live: this.broadcaster !== null,
        viewers: [...this.sessions.values()].filter(s => s.role === "viewer").length,
        info: this.streamInfo,
        comments: this.comments.slice(-50),
      }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const { 0: client, 1: server } = new WebSocketPair();
    server.accept();

    const id = crypto.randomUUID();
    this.sessions.set(server, { role: role || "viewer", id, name });

    if (role === "broadcaster") {
      if (this.broadcaster) {
        try { this.broadcaster.close(1000, "New broadcaster"); } catch {}
      }
      this.broadcaster = server;
      const title = url.searchParams.get("title") || "Live Service";
      const description = url.searchParams.get("description") || "";
      this.streamInfo = { title, description };
      this.comments = []; // clear comments on new stream
      this.broadcastAll({ type: "stream-started", info: this.streamInfo }, server);
      // Send current viewer count to broadcaster
      server.send(JSON.stringify({ type: "viewer-count", count: this.viewerCount() }));
    } else {
      if (this.broadcaster) {
        this.broadcaster.send(JSON.stringify({ type: "viewer-joined", viewerId: id }));
        server.send(JSON.stringify({ type: "stream-info", info: this.streamInfo }));
        // Send recent comments to new viewer
        server.send(JSON.stringify({ type: "chat-history", comments: this.comments.slice(-50) }));
      } else {
        server.send(JSON.stringify({ type: "stream-offline" }));
      }
      // Update viewer count for broadcaster
      this.sendViewerCount();
    }

    server.addEventListener("message", (event) => {
      try {
        const msg = JSON.parse(event.data as string);
        const session = this.sessions.get(server);
        if (!session) return;

        if (session.role === "broadcaster") {
          if (msg.type === "offer" || msg.type === "ice-candidate") {
            const target = this.findViewer(msg.viewerId);
            if (target) target.send(JSON.stringify({ ...msg, from: "broadcaster" }));
          }
          if (msg.type === "end-stream") {
            this.streamInfo = null;
            this.broadcaster = null;
            this.comments = []; // wipe comments
            this.broadcastAll({ type: "stream-ended" }, server);
          }
        } else {
          if (msg.type === "answer" || msg.type === "ice-candidate") {
            if (this.broadcaster) {
              this.broadcaster.send(JSON.stringify({ ...msg, viewerId: session.id }));
            }
          }
          // Chat message from viewer
          if (msg.type === "chat" && msg.text?.trim()) {
            const comment = {
              id: crypto.randomUUID(),
              name: session.name,
              text: msg.text.trim().slice(0, 200),
              time: new Date().toISOString(),
            };
            this.comments.push(comment);
            if (this.comments.length > 200) this.comments.shift();
            // Broadcast to everyone including broadcaster
            this.broadcastAll({ type: "chat", comment });
          }
        }
      } catch {}
    });

    server.addEventListener("close", () => {
      const session = this.sessions.get(server);
      if (session?.role === "broadcaster") {
        this.broadcaster = null;
        this.streamInfo = null;
        this.comments = []; // wipe on disconnect
        this.broadcastAll({ type: "stream-ended" }, server);
      } else if (session) {
        if (this.broadcaster) {
          this.broadcaster.send(JSON.stringify({ type: "viewer-left", viewerId: session.id }));
        }
        this.sessions.delete(server);
        this.sendViewerCount();
        return;
      }
      this.sessions.delete(server);
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  private viewerCount(): number {
    return [...this.sessions.values()].filter(s => s.role === "viewer").length;
  }

  private sendViewerCount() {
    if (this.broadcaster) {
      try {
        this.broadcaster.send(JSON.stringify({ type: "viewer-count", count: this.viewerCount() }));
      } catch {}
    }
  }

  private broadcastAll(msg: object, exclude?: WebSocket) {
    const data = JSON.stringify(msg);
    for (const [ws] of this.sessions) {
      if (ws !== exclude) {
        try { ws.send(data); } catch {}
      }
    }
  }

  private findViewer(viewerId: string): WebSocket | null {
    for (const [ws, session] of this.sessions) {
      if (session.id === viewerId && session.role === "viewer") return ws;
    }
    return null;
  }
}
