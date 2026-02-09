import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

interface VolumeProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function clamp(v: number, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

// Curva logarítmica perceptual
function volumeCurve(v: number) {
  return Math.pow(v, 2.2);
}

export default function Volume({ audioRef }: VolumeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const volume = useMotionValue(0.8); // valor perceptual (UI)
  const volumePercent = useTransform(volume, (v) => `${v * 100}%`);

  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const lastVolume = useRef(0.8);

  // ===== Sync volume -> audio =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const unsub = volume.on("change", (v) => {
      audio.volume = muted ? 0 : volumeCurve(clamp(v));
    });

    audio.volume = volumeCurve(volume.get());

    return () => unsub();
  }, [volume, muted, audioRef]);

  // ===== Wheel handler (non-passive real) =====
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const step = 0.04;
      const delta = e.deltaY > 0 ? -step : step;

      const next = clamp(volume.get() + delta);
      volume.set(next);
      setMuted(next === 0);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [volume]);

  // ===== Click / Drag =====
  const setFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const { left, width } = track.getBoundingClientRect();
    const percent = clamp((clientX - left) / width);
    volume.set(percent);
    setMuted(percent === 0);
  };

  // ===== Toggle mute =====
  const toggleMute = () => {
    if (muted) {
      volume.set(lastVolume.current);
      setMuted(false);
    } else {
      lastVolume.current = volume.get();
      volume.set(0);
      setMuted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* ICON */}
      <button
        onClick={toggleMute}
        className="cursor-pointer p-2 hover:bg-gray-400/30 rounded-lg transition"
      >
        {muted ? (
          <IoVolumeMute className="text-2xl" />
        ) : (
          <IoVolumeHigh className="text-2xl" />
        )}
      </button>

      {/* DROPDOWN */}
      <div
        className={`
          absolute left-full top-1/2 -translate-y-1/2 pl-2
          transition-opacity duration-150
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="w-36 h-10 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl flex items-center px-3">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => setFromClientX(info.point.x)}
            onPointerDown={(e) => setFromClientX(e.clientX)}
            className="relative h-2 w-full bg-neutral-600 rounded-full cursor-ew-resize touch-none"
          >
            {/* FILL */}
            <motion.div
              className="absolute left-0 top-0 h-full w-full bg-blue-500 rounded-full"
              style={{
                scaleX: volume,
                transformOrigin: "left",
              }}
            />

            {/* THUMB */}
            <motion.div
              className="absolute top-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-md -translate-y-1/2"
              style={{
                left: volumePercent,
                x: "-50%",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
