export class StreamHub {
  private state: DurableObjectState;
  private broadcaster: WebSocket | null = null;
  private streamInfo: { title: string; description: string } | null = null;
  private comments: { id: string; name: string; text: string; time: string }[] = [];

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const role = url.searchParams.get("role") as "broadcaster" | "viewer" | null;
    const name = url.searchParams.get("name") || "Guest";
    const title = url.searchParams.get("title");
    const description = url.searchParams.get("description");

    // REST: stream status
    if (url.pathname === "/stream/status") {
      const viewers = this.state.getWebSockets("viewer").length;
      return new Response(JSON.stringify({
        live: this.broadcaster !== null,
        viewers,
        info: this.streamInfo,
        comments: this.comments.slice(-50),
      }), { 
        headers: { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*" 
        } 
      });
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const { 0: client, 1: server } = new WebSocketPair();

    const tag = role === "broadcaster" ? "broadcaster" : "viewer";
    this.state.acceptWebSocket(server, [tag, `name:${name}`]);

    const id = crypto.randomUUID();
    server.serializeAttachment({ role: tag, id, name });

    if (role === "broadcaster") {
      // Close any existing broadcaster
      for (const ws of this.state.getWebSockets("broadcaster")) {
        if (ws !== server) {
          try { 
            ws.close(1000, "New broadcaster"); 
          } catch {}
        }
      }
      this.broadcaster = server;
      this.streamInfo = { 
        title: title || "Live Service", 
        description: description || "" 
      };
      // Don't wipe comments on reconnect — only wipe on explicit end-stream
      
      // Send current viewer count to broadcaster
      const viewerCount = this.state.getWebSockets("viewer").length;
      server.send(JSON.stringify({ 
        type: "viewer-count", 
        count: viewerCount 
      }));
      
      // Notify all viewers that stream started
      this._broadcastViewers({ 
        type: "stream-started", 
        info: this.streamInfo 
      });
    } else {
      // Viewer connection
      if (this.broadcaster) {
        // Send stream info to viewer
        server.send(JSON.stringify({ 
          type: "stream-info", 
          info: this.streamInfo 
        }));
        
        // Send chat history
        server.send(JSON.stringify({ 
          type: "chat-history", 
          comments: this.comments.slice(-50) 
        }));
        
        // Notify broadcaster of new viewer
        this.broadcaster.send(JSON.stringify({ 
          type: "viewer-joined", 
          viewerId: id,
          name: name
        }));
      } else {
        server.send(JSON.stringify({ type: "stream-offline" }));
      }
      this._sendViewerCount();
    }

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, data: string | ArrayBuffer) {
    try {
      const msg = JSON.parse(data as string);
      const session = ws.deserializeAttachment() as { role: string; id: string; name: string };
      if (!session) return;

      console.log(`Received message from ${session.role}:`, msg.type);

      if (session.role === "broadcaster") {
        // Handle broadcaster messages
        switch (msg.type) {
          case "offer":
            console.log(`Forwarding offer to viewer ${msg.viewerId}`);
            const targetViewer = this._findViewer(msg.viewerId);
            if (targetViewer) {
              targetViewer.send(JSON.stringify({ 
                type: "offer", 
                sdp: msg.sdp,
                viewerId: msg.viewerId 
              }));
            }
            break;
            
          case "answer":
            console.log(`Forwarding answer to broadcaster from viewer ${msg.viewerId}`);
            if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
              this.broadcaster.send(JSON.stringify({ 
                type: "answer", 
                sdp: msg.sdp,
                viewerId: msg.viewerId 
              }));
            }
            break;
            
          case "ice-candidate":
            console.log(`Forwarding ICE candidate to viewer ${msg.viewerId}`);
            const candidateViewer = this._findViewer(msg.viewerId);
            if (candidateViewer) {
              candidateViewer.send(JSON.stringify({ 
                type: "ice-candidate", 
                candidate: msg.candidate,
                viewerId: msg.viewerId 
              }));
            }
            break;
            
          case "end-stream":
            console.log("Stream ended by broadcaster");
            this.streamInfo = null;
            this.broadcaster = null;
            this.comments = [];
            this._broadcastViewers({ type: "stream-ended" });
            break;
            
          case "chat":
            if (msg.comment?.text?.trim()) {
              const comment = {
                id: crypto.randomUUID(),
                name: session.name,
                text: msg.comment.text.trim().slice(0, 200),
                time: new Date().toISOString(),
              };
              this.comments.push(comment);
              if (this.comments.length > 200) this.comments.shift();
              this._broadcastAll({ type: "chat", comment });
            }
            break;
            
          default:
            console.log(`Unknown broadcaster message type: ${msg.type}`);
        }
      } else {
        // Handle viewer messages
        switch (msg.type) {
          case "answer":
            console.log(`Viewer ${session.id} sending answer to broadcaster`);
            if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
              this.broadcaster.send(JSON.stringify({ 
                type: "answer", 
                sdp: msg.sdp,
                viewerId: session.id 
              }));
            }
            break;
            
          case "ice-candidate":
            console.log(`Viewer ${session.id} sending ICE candidate to broadcaster`);
            if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
              this.broadcaster.send(JSON.stringify({ 
                type: "ice-candidate", 
                candidate: msg.candidate,
                viewerId: session.id 
              }));
            }
            break;
            
          case "chat":
            if (msg.text?.trim()) {
              const comment = {
                id: crypto.randomUUID(),
                name: session.name,
                text: msg.text.trim().slice(0, 200),
                time: new Date().toISOString(),
              };
              this.comments.push(comment);
              if (this.comments.length > 200) this.comments.shift();
              this._broadcastAll({ type: "chat", comment });
            }
            break;
            
          default:
            console.log(`Unknown viewer message type: ${msg.type}`);
        }
      }
    } catch (err) {
      console.error("Error processing WebSocket message:", err);
    }
  }

  async webSocketClose(ws: WebSocket) {
    const session = ws.deserializeAttachment() as { role: string; id: string; name: string } | null;
    console.log(`WebSocket closed for ${session?.role}: ${session?.id}`);
    
    if (session?.role === "broadcaster") {
      this.broadcaster = null;
      this.streamInfo = null;
      // Don't wipe comments on unexpected disconnect — only on explicit end-stream
      this._broadcastViewers({ type: "stream-ended" });
    } else if (session) {
      if (this.broadcaster) {
        try { 
          this.broadcaster.send(JSON.stringify({ 
            type: "viewer-left", 
            viewerId: session.id 
          })); 
        } catch {}
      }
      this._sendViewerCount();
    }
  }

  async webSocketError(ws: WebSocket) {
    console.error("WebSocket error occurred");
    await this.webSocketClose(ws);
  }

  private _sendViewerCount() {
    const viewerCount = this.state.getWebSockets("viewer").length;
    if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
      try {
        this.broadcaster.send(JSON.stringify({
          type: "viewer-count",
          count: viewerCount,
        }));
      } catch {}
    }
    
    // Also send to all viewers
    this._broadcastViewers({
      type: "viewer-count",
      count: viewerCount,
    });
  }

  private _broadcastViewers(msg: object) {
    const data = JSON.stringify(msg);
    for (const ws of this.state.getWebSockets("viewer")) {
      try { 
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data); 
        }
      } catch {}
    }
  }

  private _broadcastAll(msg: object) {
    const data = JSON.stringify(msg);
    for (const ws of [...this.state.getWebSockets("viewer"), ...this.state.getWebSockets("broadcaster")]) {
      try { 
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data); 
        }
      } catch {}
    }
  }

  private _findViewer(viewerId: string): WebSocket | null {
    for (const ws of this.state.getWebSockets("viewer")) {
      const s = ws.deserializeAttachment() as { id: string } | null;
      if (s?.id === viewerId) return ws;
    }
    return null;
  }
}