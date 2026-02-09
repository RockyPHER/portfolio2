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
  const audioRef = useRef<HTMLAudioElement>(null!);

  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState("0:00");

  const progress = useMotionValue(0);
  const currentTime = useMotionValue(0);

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

    const next = clamp(
      audio.currentTime + seconds,
      0,
      duration || audio.duration || 0,
    );

    audio.currentTime = next;
  };

  return (
    <div className="flex w-[min(42vw,640px)] items-center justify-center gap-5">
      <Volume audioRef={audioRef} />

      {/* COVER */}
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border flex items-center justify-center text-sm text-neutral-400">
        IMG
      </div>

      {/* TIMELINE */}
      <div className="flex flex-1 items-center gap-3">
        <span className="font-mono text-sm text-gray-400 min-w-10.5 text-right">
          {displayTime}
        </span>

        <audio ref={audioRef} src="/src/assets/tokyo.mp4" preload="metadata" />

        <div
          className="h-2 w-full cursor-pointer overflow-hidden rounded-full bg-neutral-700"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full bg-blue-500"
            style={{ scaleX: progress, transformOrigin: "left" }}
          />
        </div>

        <span className="font-mono text-sm text-gray-400 min-w-10.5">
          {formatTime(duration)}
        </span>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => skip(-5)}
          className="cursor-pointer hover:scale-110 transition"
        >
          <IoPlayBack className="text-3xl" />
        </button>

        <button
          onClick={togglePlay}
          className="cursor-pointer hover:scale-110 transition"
        >
          {isPaused ? (
            <IoPlay className="text-4xl" />
          ) : (
            <IoPause className="text-4xl" />
          )}
        </button>

        <button
          onClick={() => skip(5)}
          className="cursor-pointer hover:scale-110 transition"
        >
          <IoPlayForward className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
