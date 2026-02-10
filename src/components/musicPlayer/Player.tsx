import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";
import Volume from "./Volume";

function formatTime(time: number) {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState("0:00");

  const [hoverZone, setHoverZone] = useState(false);
  const [hoverPlayer, setHoverPlayer] = useState(false);

  const progress = useMotionValue(0);
  const currentTime = useMotionValue(0);

  const isOpen = hoverZone || hoverPlayer;

  /* ===== Audio Sync ===== */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      currentTime.set(audio.currentTime);
      progress.set(audio.duration ? audio.currentTime / audio.duration : 0);
    };

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);
    const onEnded = () => setIsPaused(true);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTime, progress]);

  useMotionValueEvent(currentTime, "change", (v) => {
    setDisplayTime(formatTime(v));
  });

  /* ===== Controls ===== */
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.paused ? audio.play() : audio.pause();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = clamp((e.clientX - left) / width);

    audio.currentTime = percent * duration;
    currentTime.set(audio.currentTime);
    progress.set(percent);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = clamp(
      audio.currentTime + seconds,
      0,
      duration || audio.duration || 0,
    );
  };

  return (
    <>
      {/* Hover detection zone at bottom of screen */}
      <div
        className="fixed -bottom-20 -translate-x-1/2 w-screen h-32 z-40 cursor-pointer"
        onMouseEnter={() => setHoverZone(true)}
        onMouseLeave={() => setHoverZone(false)}
      />

      {/* Player */}
      <motion.div
        initial={false}
        animate={{ y: isOpen ? 0 : 150 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        onMouseEnter={() => setHoverPlayer(true)}
        onMouseLeave={() => setHoverPlayer(false)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,820px)] cursor-pointer"
      >
        <div className="flex items-center gap-5 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/40">
          {/* Volume */}
          <Volume audioRef={audioRef} />

          {/* Cover Art */}
          <motion.div
            animate={{ opacity: hoverZone || hoverPlayer ? 1 : 0 }}
            className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/20"
          >
            <img
              src="https://cdn-images.dzcdn.net/images/cover/64c49352f1cf69ee02bd88aa17a9f741/0x1900-000000-80-0-0.jpg"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Timeline */}
          <div className="flex flex-1 items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-white/60 min-w-10 text-right">
              {displayTime}
            </span>

            <audio
              ref={audioRef}
              src="/src/assets/tokyo.mp4"
              preload="metadata"
            />

            <div
              className="h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/20"
              onClick={handleSeek}
            >
              <motion.div
                className="h-full bg-blue-500"
                style={{ scaleX: progress, transformOrigin: "left" }}
              />
            </div>

            <span className="font-mono text-xs text-white/60 min-w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => skip(-5)}
              className="cursor-pointer hover:scale-110 transition"
            >
              <IoPlayBack className="text-2xl text-white/80" />
            </button>

            <button
              onClick={togglePlay}
              className="cursor-pointer hover:scale-110 transition"
            >
              {isPaused ? (
                <IoPlay className="text-3xl text-white" />
              ) : (
                <IoPause className="text-3xl text-white" />
              )}
            </button>

            <button
              onClick={() => skip(5)}
              className="cursor-pointer hover:scale-110 transition"
            >
              <IoPlayForward className="text-2xl text-white/80" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
