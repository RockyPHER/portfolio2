import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";
import Volume from "./Volume";

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setTremor: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

// ===== Utilitários =====
const formatTime = (time: number): string => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const clamp = (v: number, min = 0, max = 1): number =>
  Math.min(Math.max(v, min), max);

export default function Player({ audioRef, setTremor }: PlayerProps) {
  // ===== Estados =====
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState("0:00");
  const [isOpen, setIsOpen] = useState(false);

  // ===== Motion Values =====
  const progress = useMotionValue(0);
  const currentTime = useMotionValue(0);

  // ===== Refs =====
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // ===== Audio Analyser para efeito de shake =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      const ctx = new AudioContext();
      const src = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();

      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;

      src.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const SHAKE_X = 50;
    const SHAKE_Y = 40;
    const INV_255 = 1 / 255;

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);

      let bassSum = 0,
        midSum = 0,
        highSum = 0;

      for (let i = 0; i < 40; i++) bassSum += dataArray[i];
      for (let i = 40; i < 150; i++) midSum += dataArray[i];
      for (let i = 150; i < 250; i++) highSum += dataArray[i];

      const bass = (bassSum / 40) * INV_255 - 0.5;
      const mid = (midSum / 110) * INV_255 - 0.5;
      const high = (highSum / 100) * INV_255 - 0.5;

      setTremor({
        x: (mid + high) * SHAKE_X,
        y: (bass + mid) * SHAKE_Y,
      });

      rafIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [audioRef, setTremor]);

  // Cleanup do AudioContext
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
      }
    };
  }, []);

  // ===== Sincronização de áudio =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const time = audio.currentTime;
      const dur = audio.duration;
      currentTime.set(time);
      if (dur) progress.set(time / dur);
    };

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);
    const handleEnded = () => {
      setIsPaused(true);
      audio.currentTime = 0;
      currentTime.set(0);
      progress.set(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, currentTime, progress]);

  // Atualiza display de tempo
  useMotionValueEvent(currentTime, "change", (value) => {
    setDisplayTime(formatTime(value));
  });

  // ===== Controles =====
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.ended || audio.currentTime >= audio.duration) {
      audio.currentTime = 0;
      currentTime.set(0);
      progress.set(0);
    }

    if (audio.paused) {
      audio.play().catch(console.error);
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
      audio.currentTime = clamp(audio.currentTime + seconds, 0, duration);
    },
    [audioRef, duration],
  );

  // ===== Valores memoizados =====
  const durationText = useMemo(() => formatTime(duration), [duration]);

  const containerClassName = useMemo(
    () =>
      `flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-xl md:rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl transition-all duration-300 ${
        isPaused
          ? "shadow-black/40"
          : "shadow-blue-500/30 ring-1 ring-blue-500/20"
      }`,
    [isPaused],
  );

  return (
    <>
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[min(85vw,320px)] sm:w-[min(80vw,600px)] md:w-[min(75vw,850px)] lg:w-[min(70vw,1100px)]"
        style={{ height: "80px" }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <motion.div
          initial={false}
          animate={{ y: isOpen ? 0 : 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-0 right-0 cursor-pointer pointer-events-auto"
        >
          <div className={containerClassName}>
            {/* Controle de Volume */}
            <div className="hidden sm:flex items-center">
              <Volume audioRef={audioRef} />
            </div>

            {/* Capa do Álbum */}
            <motion.div
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className="hidden md:block h-14 w-14 lg:h-16 lg:w-16 shrink-0 overflow-hidden rounded-lg md:rounded-xl border-2 border-white/30 shadow-lg"
            >
              <img
                src="https://cdn-images.dzcdn.net/images/cover/64c49352f1cf69ee02bd88aa17a9f741/0x1900-000000-80-0-0.jpg"
                alt="Tokyo Drift Album Cover"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Timeline e Tempo */}
            <div className="flex flex-1 items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0">
              {/* Tempo atual */}
              <span className="font-mono text-[10px] sm:text-xs text-white/70 min-w-8 sm:min-w-10 text-right tabular-nums">
                {displayTime}
              </span>

              {/* Elemento de áudio */}
              <audio
                ref={audioRef}
                src="https://files.catbox.moe/9kwswc.mp4"
                preload="metadata"
                crossOrigin="anonymous"
                autoPlay
              />

              {/* Barra de progresso */}
              <div
                className="h-2 sm:h-2.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/20 hover:bg-white/30 transition-colors group"
                onClick={handleSeek}
              >
                <motion.div
                  className="h-full bg-linear-to-r from-blue-500 to-cyan-400 group-hover:from-blue-400 group-hover:to-cyan-300 transition-colors"
                  style={{ scaleX: progress, transformOrigin: "left" }}
                />
              </div>

              {/* Duração total */}
              <span className="font-mono text-[10px] sm:text-xs text-white/70 min-w-8 sm:min-w-10 tabular-nums">
                {durationText}
              </span>
            </div>

            {/* Controles de reprodução */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
              <motion.button
                onClick={() => skip(-5)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block text-white/70 hover:text-white transition-colors"
                aria-label="Voltar 5 segundos"
              >
                <IoPlayBack className="text-lg md:text-xl" />
              </motion.button>

              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white p-1"
                aria-label={isPaused ? "Reproduzir" : "Pausar"}
              >
                {isPaused ? (
                  <IoPlay className="text-2xl sm:text-3xl" />
                ) : (
                  <IoPause className="text-2xl sm:text-3xl" />
                )}
              </motion.button>

              <motion.button
                onClick={() => skip(5)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block text-white/70 hover:text-white transition-colors"
                aria-label="Avançar 5 segundos"
              >
                <IoPlayForward className="text-lg md:text-xl" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Título da música */}
      <motion.div
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 10,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="fixed bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 pointer-events-none z-50"
      >
        <div className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/30 shadow-xl">
          <div className="flex items-center gap-2">
            {!isPaused && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            )}
            <span className="text-xs sm:text-sm text-white/90 font-medium whitespace-nowrap">
              {isPaused ? "Paused" : "Playing"}:{" "}
              <span className="text-blue-400">Tokyo Drift</span>
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
