import { useState, useEffect, useRef } from "react";

// Replace these with real video IDs from youtube.com/@MASAJJATOWEROFMERCY/videos
// e.g. from https://www.youtube.com/watch?v=XXXXXXXXXXX → use "XXXXXXXXXXX"
const VIDEO_IDS = [
  "l09PIy9jP2c",
  "RFK6cE9j7FM",
];

const YoutubeBackground = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Cycle to next video every 30 seconds
  useEffect(() => {
    timer.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % VIDEO_IDS.length);
      setLoaded(false);
    }, 30000);
    return () => clearTimeout(timer.current);
  }, [current]);

  const src =
    `https://www.youtube.com/embed/${VIDEO_IDS[current]}` +
    `?autoplay=1&mute=1&loop=1&controls=0&disablekb=1` +
    `&modestbranding=1&playsinline=1&rel=0&showinfo=0` +
    `&playlist=${VIDEO_IDS[current]}`;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fallback image shown until iframe loads */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${loaded ? "opacity-0" : "opacity-100"}`}
        style={{ zIndex: 1 }}
      />
      <iframe
        key={VIDEO_IDS[current]}
        src={src}
        title="Background worship video"
        allow="autoplay; encrypted-media"
        className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 0 }}
        onLoad={() => setLoaded(true)}
      />
      {/* Dark overlay - light enough to see the video */}
      <div className="absolute inset-0 bg-foreground/30" style={{ zIndex: 2 }} />
    </div>
  );
};

export default YoutubeBackground;
