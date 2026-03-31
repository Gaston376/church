import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Send, MessageCircle, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import Layout from "@/components/Layout";

const PLAYLIST = [
  "bLJ-pmKzj4I",
  "vTgyaI4nDH0",
  "w5Gvz66oe50",
  "4uttRQ9QKTk",
  "sX0x_dPnEt8",
  "T9TXh4_iFF4",
  "sOEVwOIWo7w",
  "fJi8agwZ7sc",
  "Jj9FxYQNK1s",
  "SFCpN8w81cc",
];

const BACKEND_URL = "https://towerintercessoryministry.towerintercessoryministry.workers.dev";
const WS_URL = "wss://towerintercessoryministry.towerintercessoryministry.workers.dev/stream";
const STATUS_URL = `${BACKEND_URL}/stream/status`;

interface StreamInfo { title: string; description: string; }
interface Comment { id: string; name: string; text: string; time: string; }

const MINISTRY_NAME = "Massajja Tower of Intercessory Ministry";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const LiveTV = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YT.Player | null>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytIndexRef = useRef(0);
  const playerWrapRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [ytPlaying, setYtPlaying] = useState(true);
  const [ytMuted, setYtMuted] = useState(true);
  const [status, setStatus] = useState<"checking" | "offline" | "connecting" | "live">("checking");
  const [info, setInfo] = useState<StreamInfo | null>(null);
  const [viewers, setViewers] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [viewerName, setViewerName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [tickerUpdates, setTickerUpdates] = useState<string[]>([
    "Welcome to Massajja Tower of Intercessory Ministry Live TV",
    "God First — Winning Souls, Setting Captives Free",
    "Sunday Worship Service every Sunday at 10:00 AM",
    "Intercessory Prayer: Thursday 6:00 AM",
  ]);

  // Init YouTube IFrame API player
  useEffect(() => {
    const initPlayer = () => {
      if (!ytContainerRef.current) return;
      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId: PLAYLIST[0],
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,       // hide all YouTube controls
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,      // disable keyboard shortcuts
          iv_load_policy: 3, // hide annotations
          playlist: PLAYLIST.join(","),
          loop: 0,
        },
        events: {
          onReady: () => {
            // Player is ready — if we're already offline, start playing
            try { ytPlayerRef.current?.playVideo(); } catch {}
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            // 0 = ended → advance to next
            if (event.data === 0) {
              ytIndexRef.current = (ytIndexRef.current + 1) % PLAYLIST.length;
              ytPlayerRef.current?.loadVideoById(PLAYLIST[ytIndexRef.current]);
            }
            setYtPlaying(event.data === 1);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById("yt-api-script")) {
        const script = document.createElement("script");
        script.id = "yt-api-script";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
    };
  }, []);

  // Pause YT when live stream starts, resume when it ends
  useEffect(() => {
    if (status === "live") {
      try { ytPlayerRef.current?.pauseVideo(); } catch {}
    } else if (status === "offline") {
      try { ytPlayerRef.current?.playVideo(); } catch {}
    }
  }, [status]);

  // Fetch ticker updates from backend
  useEffect(() => {
    fetch(`${BACKEND_URL}/updates`)
      .then(r => r.json())
      .then(d => {
        if (d.updates?.length) {
          setTickerUpdates(d.updates.map((u: { title: string; content: string }) => `${u.title} — ${u.content}`));
        }
      })
      .catch(() => {});
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [comments]);

  // HTTP polling — check stream status every 3s, open WS only when live
  useEffect(() => {
    let ws: WebSocket | null = null;
    let pc: RTCPeerConnection | null = null;
    let pollTimer: ReturnType<typeof setInterval>;
    let wasLive = false;

    const displayName = localStorage.getItem("live_name") || "Guest";
    const savedName = localStorage.getItem("live_name");
    if (savedName) { setViewerName(savedName); setNameSet(true); }

    const closeWS = () => {
      ws?.close();
      ws = null;
      wsRef.current = null;
      pc?.close();
      pc = null;
      pcRef.current = null;
    };

    const openWS = (name: string) => {
      if (ws && ws.readyState <= WebSocket.OPEN) return; // already open
      ws = new WebSocket(`${WS_URL}?role=viewer&name=${encodeURIComponent(name)}`);
      wsRef.current = ws;

      ws.onmessage = async (e) => {
        const msg = JSON.parse(e.data);

        if (msg.type === "stream-ended") {
          setStatus("offline");
          setInfo(null);
          setComments([]);
          closeWS();
        }

        if (msg.type === "chat-history") setComments(msg.comments || []);
        if (msg.type === "chat" && msg.comment) {
          setComments(prev => [...prev.slice(-199), msg.comment]);
        }

        if (msg.type === "offer") {
          if (pc) { try { pc.close(); } catch {} }
          pc = new RTCPeerConnection({ iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ]});
          pcRef.current = pc;
          pc.ontrack = (event) => {
            if (videoRef.current) {
              videoRef.current.srcObject = event.streams[0];
              videoRef.current.play().catch(() => {});
            }
            setStatus("live");
          };
          pc.onicecandidate = (ev) => {
            if (ev.candidate && ws?.readyState === WebSocket.OPEN)
              ws.send(JSON.stringify({ type: "ice-candidate", candidate: ev.candidate }));
          };
          pc.onconnectionstatechange = () => {
            if (pc && (pc.connectionState === "failed" || pc.connectionState === "disconnected")) {
              setStatus("connecting");
            }
          };
          await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          ws?.send(JSON.stringify({ type: "answer", sdp: answer }));
        }

        if (msg.type === "ice-candidate" && pc) {
          try { await pc.addIceCandidate(new RTCIceCandidate(msg.candidate)); } catch {}
        }
      };

      ws.onclose = () => {
        ws = null;
        wsRef.current = null;
      };
    };

    const poll = async () => {
      try {
        const r = await fetch(STATUS_URL);
        const d = await r.json();
        if (d.live) {
          setInfo(d.info);
          setViewers(d.viewers);
          if (!wasLive) {
            wasLive = true;
            setStatus("connecting");
            setComments(d.comments || []);
            openWS(displayName);
          }
        } else {
          if (wasLive) {
            wasLive = false;
            setStatus("offline");
            setInfo(null);
            closeWS();
          } else if (status === "checking") {
            setStatus("offline");
          }
        }
      } catch {
        if (status === "checking") setStatus("offline");
      }
    };

    poll(); // immediate first check
    pollTimer = setInterval(poll, 3000);

    return () => {
      clearInterval(pollTimer);
      closeWS();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    const n = viewerName.trim() || "Guest";
    localStorage.setItem("live_name", n);
    setViewerName(n);
    setNameSet(true);
    wsRef.current?.close();
  };

  const sendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "chat", text: chatInput.trim() }));
    setChatInput("");
  };

  const togglePlay = () => {
    if (!ytPlayerRef.current) return;
    if (ytPlaying) { ytPlayerRef.current.pauseVideo(); setYtPlaying(false); }
    else { ytPlayerRef.current.playVideo(); setYtPlaying(true); }
  };

  const toggleMute = () => {
    if (!ytPlayerRef.current) return;
    if (ytMuted) { ytPlayerRef.current.unMute(); setYtMuted(false); }
    else { ytPlayerRef.current.mute(); setYtMuted(true); }
  };

  const toggleFullscreen = () => {
    const el = playerWrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  return (
    <Layout>
      <section className="min-h-screen bg-foreground py-24 -mt-20 pt-28">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Radio size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-background">Live TV</h1>
              <p className="text-background/50 text-sm">{MINISTRY_NAME}</p>
            </div>
            {status === "live" && (
              <span className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE
              </span>
            )}
            {status === "offline" && (
              <span className="ml-auto flex items-center gap-2 bg-white/10 text-background/60 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-white/30" /> CHURCH TV
              </span>
            )}
          </div>

          {/* Player */}
          <motion.div
            ref={playerWrapRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-black rounded-2xl overflow-hidden shadow-gold aspect-video"
          >
            {/* WebRTC live stream video — z-20 when live so it covers YT player */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${status === "live" ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"}`}
            />

            {/* YouTube player div — always mounted so API can attach, sits at z-0 */}
            <div
              ref={ytContainerRef}
              className="absolute inset-0 w-full h-full z-0"
            />

            {/* Full overlay — hides YouTube UI. Hidden when live so video shows through */}
            <div className={`absolute inset-0 z-10 bg-transparent pointer-events-auto ${status === "live" ? "hidden" : "block"}`} />

            {/* Our own minimal controls — play/pause + mute + fullscreen */}
            {status !== "live" && (
              <div className="absolute bottom-12 left-4 z-20 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
                >
                  {ytPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
                >
                  {ytMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            )}
            {/* Fullscreen button — always visible bottom-right */}
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-12 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {/* Watermark — top-left corner, always visible including fullscreen */}
            <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
              {status === "live" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-white text-xs font-bold tracking-wide">LIVE</span>
                </>
              ) : (
                <>
                  <Radio size={11} className="text-primary" />
                  <span className="text-white text-xs font-bold tracking-wide">CHURCH TV</span>
                </>
              )}
            </div>
            {(status === "checking" || status === "connecting") && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 pointer-events-none">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-white/80 text-sm">
                    {status === "checking" ? "Checking stream..." : "Connecting to live..."}
                  </p>
                </div>
              </div>
            )}

            {/* Marquee ticker */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-foreground/80 backdrop-blur-sm border-t border-white/10 overflow-hidden py-2">
              <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
                {[...tickerUpdates, ...tickerUpdates].map((text, i) => (
                  <span key={i} className="text-background text-sm font-medium px-8 flex-shrink-0">
                    <span className="text-primary font-bold mr-2">●</span>
                    {text}
                    <span className="mx-8 text-primary/40">|</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stream info bar (when live) */}
          {info && (
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-background">{info.title}</h2>
                {info.description && <p className="text-background/50 text-sm mt-1">{info.description}</p>}
              </div>
              <div className="flex items-center gap-1 text-background/40 text-sm flex-shrink-0">
                <Users size={14} /> {viewers}
              </div>
            </div>
          )}

          {/* Floating chat button */}
          <button
            onClick={() => setChatOpen(o => !o)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-gold font-bold text-sm transition-all hover:scale-105"
          >
            <MessageCircle size={18} />
            {chatOpen ? "Close Chat" : "Live Chat"}
            {comments.length > 0 && !chatOpen && (
              <span className="bg-white text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {comments.length > 99 ? "99+" : comments.length}
              </span>
            )}
          </button>

          {/* Floating chat panel */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-20 right-6 z-50 flex flex-col bg-foreground border border-white/10 rounded-2xl shadow-gold overflow-hidden w-80"
                style={{ height: "420px" }}
              >
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={15} className="text-primary" />
                    <span className="font-heading font-bold text-background text-sm">Live Chat</span>
                    {status === "live" && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                  </div>
                  <button onClick={() => setChatOpen(false)} className="text-background/40 hover:text-background text-lg leading-none">&times;</button>
                </div>

                <AnimatePresence>
                  {!nameSet && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="p-3 border-b border-white/10">
                      <p className="text-background/50 text-xs mb-2">Enter your name to chat</p>
                      <form onSubmit={handleSetName} className="flex gap-2">
                        <input
                          value={viewerName}
                          onChange={e => setViewerName(e.target.value)}
                          placeholder="Your name"
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-background text-sm placeholder:text-background/30 outline-none focus:border-primary"
                        />
                        <button type="submit" className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-bold">Join</button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                  {comments.length === 0 ? (
                    <p className="text-background/30 text-xs text-center mt-8">No comments yet. Be the first!</p>
                  ) : (
                    comments.map(c => (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-primary text-xs font-bold">{c.name}</span>
                        <span className="text-background/30 text-xs ml-2">
                          {new Date(c.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <p className="text-background/80 text-sm mt-0.5 leading-snug">{c.text}</p>
                      </motion.div>
                    ))
                  )}
                </div>

                <form onSubmit={sendComment} className="p-3 border-t border-white/10 flex gap-2">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder={nameSet ? "Say something..." : "Join to chat"}
                    disabled={!nameSet || status !== "live"}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-background text-sm placeholder:text-background/30 outline-none focus:border-primary disabled:opacity-40"
                  />
                  <button
                    type="submit"
                    disabled={!nameSet || !chatInput.trim() || status !== "live"}
                    className="bg-primary text-primary-foreground p-2 rounded-lg disabled:opacity-40"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </Layout>
  );
};

export default LiveTV;
