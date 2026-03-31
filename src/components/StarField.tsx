import { useEffect, useRef } from "react";

interface Star { x: number; y: number; z: number; px: number; py: number; }

interface Dove {
  x: number; y: number;
  vx: number; vy: number;
  wing: number;       // wing flap angle
  wingDir: number;    // flap direction
  size: number;
  alpha: number;
}

const NUM_STARS = 800;
const SPEED = 0.6;
const NUM_DOVES = 3;

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Stars
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W - W / 2, y: Math.random() * H - H / 2,
      z: Math.random() * W, px: 0, py: 0,
    }));

    // Moon state
    let moonAngle = 0;
    let moonRotation = 0;

    // Doves
    const makeDove = (): Dove => ({
      x: W * 0.5 + (Math.random() - 0.5) * W * 0.3,
      y: H * 0.5 + (Math.random() - 0.5) * H * 0.3,
      vx: (Math.random() * 0.8 + 0.4) * (Math.random() < 0.5 ? 1 : -1),
      vy: (Math.random() * 0.4 - 0.2),
      wing: 0,
      wingDir: 1,
      size: Math.random() * 10 + 12,
      alpha: Math.random() * 0.4 + 0.5,
    });
    const doves: Dove[] = Array.from({ length: NUM_DOVES }, makeDove);

    const drawDove = (x: number, y: number, size: number, wing: number, alpha: number, facingLeft: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      if (facingLeft) ctx.scale(-1, 1);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.2;

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.55, size * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(size * 0.5, -size * 0.1, size * 0.18, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.beginPath();
      ctx.moveTo(size * 0.65, -size * 0.1);
      ctx.lineTo(size * 0.82, -size * 0.06);
      ctx.lineTo(size * 0.65, -size * 0.02);
      ctx.closePath();
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-size * 0.5, 0);
      ctx.lineTo(-size * 0.75, -size * 0.15);
      ctx.lineTo(-size * 0.8, size * 0.05);
      ctx.closePath();
      ctx.fill();

      // Left wing (top)
      const wUp = -Math.abs(Math.sin(wing)) * size * 0.7;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.05);
      ctx.quadraticCurveTo(size * 0.1, wUp, size * 0.35, wUp * 0.6);
      ctx.quadraticCurveTo(size * 0.1, -size * 0.05, 0, -size * 0.05);
      ctx.fill();

      // Right wing (bottom)
      const wDown = Math.abs(Math.sin(wing)) * size * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.05);
      ctx.quadraticCurveTo(size * 0.1, wDown, size * 0.35, wDown * 0.6);
      ctx.quadraticCurveTo(size * 0.1, size * 0.05, 0, size * 0.05);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Deep space
      ctx.fillStyle = "rgb(4, 8, 35)";
      ctx.fillRect(0, 0, W, H);

      // Nebula
      const nebula = ctx.createRadialGradient(W * 0.3, H * 0.5, 0, W * 0.3, H * 0.5, W * 0.6);
      nebula.addColorStop(0, "rgba(60, 40, 120, 0.1)");
      nebula.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, W, H);

      // Moon — orbiting around screen center
      moonAngle += 0.0008;
      moonRotation += 0.003;
      const moonX = W * 0.5 + Math.cos(moonAngle) * W * 0.3;
      const moonY = H * 0.5 + Math.sin(moonAngle) * H * 0.3;

      // Moon glow
      const moonGrad = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 320);
      moonGrad.addColorStop(0, "rgba(240, 230, 200, 0.28)");
      moonGrad.addColorStop(0.4, "rgba(200, 180, 140, 0.1)");
      moonGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = moonGrad;
      ctx.fillRect(0, 0, W, H);

      // Moon disc with rotation (crescent shadow rotates)
      ctx.save();
      ctx.translate(moonX, moonY);
      ctx.rotate(moonRotation);
      const discGrad = ctx.createRadialGradient(-8, -8, 3, 0, 0, 46);
      discGrad.addColorStop(0, "rgba(255, 252, 230, 1)");
      discGrad.addColorStop(0.5, "rgba(240, 220, 170, 0.92)");
      discGrad.addColorStop(1, "rgba(200, 170, 120, 0.5)");
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.fillStyle = discGrad;
      ctx.fill();
      // Crescent shadow
      ctx.beginPath();
      ctx.arc(14, -6, 38, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(4, 8, 35, 0.55)";
      ctx.fill();
      ctx.restore();

      // Stars
      ctx.save();
      ctx.translate(W / 2, H / 2);
      for (const s of stars) {
        s.z -= SPEED;
        if (s.z <= 0) {
          s.x = Math.random() * W - W / 2;
          s.y = Math.random() * H - H / 2;
          s.z = W;
          s.px = (s.x / s.z) * W;
          s.py = (s.y / s.z) * H;
        }
        const sx = (s.x / s.z) * W;
        const sy = (s.y / s.z) * H;
        const progress = 1 - s.z / W;
        const r = Math.max(0.6, progress * 3.2);
        const alpha = Math.min(1, progress * 1.4);

        ctx.beginPath();
        ctx.moveTo(s.px, s.py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.3})`;
        ctx.lineWidth = r * 0.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${alpha})`;
        ctx.fill();

        if (r > 2) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - r * 2.5, sy); ctx.lineTo(sx + r * 2.5, sy);
          ctx.moveTo(sx, sy - r * 2.5); ctx.lineTo(sx, sy + r * 2.5);
          ctx.stroke();
        }
        s.px = sx; s.py = sy;
      }
      ctx.restore();

      // Doves
      for (const d of doves) {
        d.x += d.vx;
        d.y += d.vy + Math.sin(Date.now() * 0.001 + d.x * 0.01) * 0.15;
        d.wing += 0.12;

        // Wrap around full screen
        if (d.x > W + 60) d.x = -60;
        if (d.x < -60) d.x = W + 60;
        if (d.y < -60) d.y = H + 60;
        if (d.y > H + 60) d.y = -60;

        drawDove(d.x, d.y, d.size, d.wing, d.alpha, d.vx < 0);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", setSize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: "rgb(4, 8, 35)" }}
    />
  );
};

export default StarField;
