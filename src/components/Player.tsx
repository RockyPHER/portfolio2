import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";
import Volume from "./Volume";

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setTremor: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

function formatTime(time: number) {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

export default function Player({ audioRef, setTremor }: PlayerProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState("0:00");

  const [hoverZone, setHoverZone] = useState(false);
  const [hoverPlayer, setHoverPlayer] = useState(false);

  const progress = useMotionValue(0);
  const currentTime = useMotionValue(0);

  // Ref para evitar múltiplas criações do AudioContext
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const isOpen = hoverZone || hoverPlayer;

  // ===== Audio Analyser (Tremor/Shake Effect) - OTIMIZADO =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Evita criar múltiplos contextos
    if (!audioContextRef.current) {
      const ctx = new AudioContext();
      const src = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512; // Reduzido de 1024 para melhor performance
      analyser.smoothingTimeConstant = 0.8; // Suavização
      src.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Constantes pré-calculadas
    const SHAKE_X = 50;
    const SHAKE_Y = 40;
    const INV_255 = 1 / 255;

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);

      // Cálculos otimizados
      let bassSum = 0,
        midSum = 0,
        highSum = 0;

      for (let i = 0; i < 40; i++) bassSum += dataArray[i];
      for (let i = 40; i < 150; i++) midSum += dataArray[i];
      for (let i = 150; i < 250; i++) highSum += dataArray[i];

      const bass = bassSum / 40;
      const mid = midSum / 110;
      const high = highSum / 100;

      // Cálculo simplificado
      const midNorm = mid * INV_255 - 0.5;
      const highNorm = high * INV_255 - 0.5;
      const bassNorm = bass * INV_255 - 0.5;

      setTremor({
        x: (midNorm + highNorm) * SHAKE_X,
        y: (bassNorm + midNorm) * SHAKE_Y,
      });

      rafIdRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [audioRef, setTremor]);

  // Cleanup do AudioContext quando componente desmontar
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
      }
    };
  }, []);

  // ===== Audio Sync - OTIMIZADO =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const time = audio.currentTime;
      const dur = audio.duration;
      currentTime.set(time);
      if (dur) progress.set(time / dur);
    };

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);

    const onEnded = () => {
      setIsPaused(true);
      audio.currentTime = 0;
      currentTime.set(0);
      progress.set(0);
    };

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
  }, [audioRef, currentTime, progress]);

  useMotionValueEvent(currentTime, "change", (v) => {
    setDisplayTime(formatTime(v));
  });

  // ===== Controls - OTIMIZADOS COM useCallback =====
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.ended || audio.currentTime >= audio.duration) {
      audio.currentTime = 0;
      currentTime.set(0);
      progress.set(0);
    }

    if (audio.paused) {
      audio.play().catch((err) => console.error("Erro ao dar play:", err));
    } else {
      audio.pause();
    }
  }, [audioRef, currentTime, progress]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;

      const { left, width } = e.currentTarget.getBoundingClientRect();
      const percent = clamp((e.clientX - left) / width);

      audio.currentTime = percent * duration;
      currentTime.set(audio.currentTime);
      progress.set(percent);
    },
    [audioRef, duration, currentTime, progress],
  );

  const skip = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.currentTime = clamp(
        audio.currentTime + seconds,
        0,
        duration || audio.duration || 0,
      );
    },
    [audioRef, duration],
  );

  // ===== Handlers de hover otimizados =====
  const handleZoneEnter = useCallback(() => setHoverZone(true), []);
  const handleZoneLeave = useCallback(() => setHoverZone(false), []);
  const handlePlayerEnter = useCallback(() => setHoverPlayer(true), []);
  const handlePlayerLeave = useCallback(() => setHoverPlayer(false), []);

  // ===== Memoização de valores =====
  const durationText = useMemo(() => formatTime(duration), [duration]);

  const playerTransition = useMemo(
    () => ({
      type: "spring" as const,
      stiffness: 260,
      damping: 25,
    }),
    [],
  );

  const titleTransition = useMemo(
    () => ({
      type: "spring" as const,
      stiffness: 260,
      damping: 25,
    }),
    [],
  );

  const containerClassName = useMemo(
    () =>
      `flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-shadow duration-300 ${!isPaused ? "shadow-blue-500/50 shadow-lg" : "shadow-black/40"}`,
    [isPaused],
  );

  return (
    <>
      {/* Hover detection zone at bottom of screen */}
      <div
        className="fixed bottom-0 left-0 w-full h-16 z-10 cursor-pointer pointer-events-auto"
        onMouseEnter={handleZoneEnter}
        onMouseLeave={handleZoneLeave}
      />

      {/* Player */}
      <motion.div
        initial={false}
        animate={{ y: isOpen ? 0 : 80 }}
        transition={playerTransition}
        onMouseEnter={handlePlayerEnter}
        onMouseLeave={handlePlayerLeave}
        className="fixed bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(80vw,280px)] sm:w-[min(75vw,550px)] md:w-[min(70vw,820px)] lg:w-[min(65vw,1050px)] xl:w-[min(60vw,1150px)] cursor-pointer px-2 sm:px-0"
      >
        <div className={containerClassName}>
          {/* Volume */}
          <div className="hidden sm:block">
            <Volume audioRef={audioRef} />
          </div>

          {/* Cover Art */}
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block h-12 md:h-16 w-12 md:w-16 shrink-0 overflow-hidden rounded-lg md:rounded-xl border border-white/20"
          >
            <img
              src="https://cdn-images.dzcdn.net/images/cover/64c49352f1cf69ee02bd88aa17a9f741/0x1900-000000-80-0-0.jpg"
              alt="Album Cover"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Timeline */}
          <div className="flex flex-1 items-center gap-1 sm:gap-2 md:gap-3 min-w-0">
            <span className="font-mono text-xs text-white/60 min-w-8 sm:min-w-10 text-right">
              {displayTime}
            </span>

            <audio
              ref={audioRef}
              src="../../public/tokyo.mp4"
              preload="metadata"
              crossOrigin="anonymous"
              autoPlay
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

            <span className="font-mono text-xs text-white/60 min-w-8 sm:min-w-10">
              {durationText}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => skip(-5)}
              className="cursor-pointer hover:scale-110 transition hidden sm:block"
              title="Voltar 5s"
              type="button"
            >
              <IoPlayBack className="text-lg md:text-xl text-white/80" />
            </button>

            <button
              onClick={togglePlay}
              className="cursor-pointer hover:scale-110 transition"
              type="button"
            >
              {isPaused ? (
                <IoPlay className="text-xl sm:text-2xl text-white" />
              ) : (
                <IoPause className="text-xl sm:text-2xl text-white" />
              )}
            </button>

            <button
              onClick={() => skip(5)}
              className="cursor-pointer hover:scale-110 transition hidden sm:block"
              title="Avançar 5s"
              type="button"
            >
              <IoPlayForward className="text-lg md:text-xl text-white/80" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Song Title */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={titleTransition}
        className="fixed bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 pointer-events-none z-50"
      >
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-lg md:rounded-xl bg-black/40 backdrop-blur-md border border-white/20 shadow-lg shadow-black/60">
          <span className="text-xs sm:text-sm text-white/80 font-medium whitespace-nowrap font-mono">
            Now Playing: Tokyo Drift
          </span>
        </div>
      </motion.div>
    </>
  );
}
