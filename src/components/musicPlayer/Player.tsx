import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";

function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState("0:00");

  const progress = useMotionValue(0); // 0 → 1
  const currentTime = useMotionValue(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      currentTime.set(audio.currentTime);

      if (!isNaN(audio.duration)) {
        progress.set(audio.currentTime / audio.duration);
      }
    };

    const onLoaded = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", onLoaded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  function formatTime(time: number) {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  useMotionValueEvent(currentTime, "change", (value) => {
    setDisplayTime(formatTime(value));
  });

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPaused(false);
    } else {
      audio.pause();
      setIsPaused(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    audio.currentTime = percent * duration;

    progress.set(percent);
    currentTime.set(audio.currentTime);
  };

  return (
    <div className="w-72">
      <audio ref={audioRef} src="/src/assets/tokyo.mp4" preload="metadata" />

      <div
        className="w-full bg-gray-300 rounded-full h-2 mt-4 cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          style={{
            scaleX: progress,
            transformOrigin: "left",
          }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
        <span>{displayTime}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex gap-3 items-center justify-center mt-3">
        <button>
          <IoPlayBack className="text-3xl" />
        </button>

        <button onClick={togglePlay}>
          {isPaused ? (
            <IoPlay className="text-4xl" />
          ) : (
            <IoPause className="text-4xl" />
          )}
        </button>

        <button>
          <IoPlayForward className="text-3xl" />
        </button>
      </div>
    </div>
  );
}

export default Player;
