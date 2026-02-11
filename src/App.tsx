import Main from "./components/Main";
import Edits from "./components/Edits";
import Design from "./components/Design";
import Projects from "./components/Projects";
import Player from "./components/Player";
import Backdrop from "./components/Backdrop";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StancePage = "main" | "projects" | "videos" | "design";

function App() {
  // ===== Estados principais =====
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [viewsCount, setViewsCount] = useState(0);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // ===== Shake controlado pelo áudio =====
  const [musicShake, setMusicShake] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLAudioElement>(null);

  // ===== Stance simplificado - agora só um string =====
  const [activePage, setActivePage] = useState<StancePage>("main");

  // ===== Rotação alvo do mouse =====
  const [targetRotateX, setTargetRotateX] = useState(0);
  const [targetRotateY, setTargetRotateY] = useState(0);

  // ===== Funções de clique otimizadas com useCallback =====
  const handleOnClick = useCallback(() => {
    setShow(true);
    setViewsCount((prev) => prev + 1);
  }, []);

  const handleOnClickProjects = useCallback(() => {
    setActivePage("projects");
  }, []);

  const handleOnClickVideos = useCallback(() => {
    setActivePage("videos");
  }, []);

  const handleOnClickDesign = useCallback(() => {
    setActivePage("design");
  }, []);

  const handleOnClickBack = useCallback(() => {
    setActivePage("main");
  }, []);

  // ===== Rotação do card otimizada =====
  const lerp = useCallback(
    (start: number, end: number, t: number) => start + (end - start) * t,
    [],
  );

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !show) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotationX = ((e.clientY - centerY) / (rect.height / 2)) * 8;
      const rotationY = ((e.clientX - centerX) / (rect.width / 2)) * -8;

      setTargetRotateX(rotationX);
      setTargetRotateY(rotationY);
    },
    [show],
  );

  const handleCardMouseLeave = useCallback(() => {
    setTargetRotateX(0);
    setTargetRotateY(0);
  }, []);

  // ===== Suavização otimizada - sem recriação desnecessária =====
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      setRotateX((v) => lerp(v, targetRotateX, 0.1));
      setRotateY((v) => lerp(v, targetRotateY, 0.1));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetRotateX, targetRotateY, lerp]);

  // ===== Memoização dos estilos para evitar recálculos =====
  const cardRotationStyle = useMemo(
    () => ({
      rotateX,
      rotateY,
    }),
    [rotateX, rotateY],
  );

  const ghostCard1Style = useMemo(
    () => ({
      x: musicShake.x * 3 + 100,
      y: musicShake.y * 3 + 60,
    }),
    [musicShake.x, musicShake.y],
  );

  const ghostCard2Style = useMemo(
    () => ({
      x: musicShake.x * 1.5 + 50,
      y: musicShake.y * 1.5 + 30,
    }),
    [musicShake.x, musicShake.y],
  );

  // ===== Transição suave para o spring do card =====
  const cardTransition = useMemo(
    () => ({
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    }),
    [],
  );

  // ===== Renderização condicional otimizada =====
  const renderActivePage = useMemo(() => {
    switch (activePage) {
      case "projects":
        return <Projects onClick={handleOnClickBack} />;
      case "videos":
        return <Edits onClick={handleOnClickBack} />;
      case "design":
        return <Design onClick={handleOnClickBack} />;
      default:
        return (
          <Main
            views={viewsCount}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClickDesign={handleOnClickDesign}
            onClickProjects={handleOnClickProjects}
            onClickVideos={handleOnClickVideos}
          />
        );
    }
  }, [
    activePage,
    viewsCount,
    isOpen,
    handleOnClickBack,
    handleOnClickDesign,
    handleOnClickProjects,
    handleOnClickVideos,
  ]);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden flex items-center justify-center text-white p-2 sm:p-4 md:p-0">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-50 z-0"
        src="https://files.catbox.moe/2dg933.mp4"
        loop
        muted
        autoPlay
        playsInline
      />

      {/* Botão inicial */}
      {!show && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <Backdrop>
            <button
              className="w-full h-full flex justify-center items-center cursor-pointer"
              onClick={handleOnClick}
            >
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                CLICK
              </p>
            </button>
          </Backdrop>
        </motion.div>
      )}

      {/* Card Container */}
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-1 sm:p-2 md:p-4 z-10"
            style={{ perspective: "2000px" }}
          >
            <div className="relative">
              {/* Card Fantasma 1 */}
              <motion.div
                style={ghostCard1Style}
                className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_0_80px_rgba(139,0,0,0.6)] -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
              />

              {/* Card Fantasma 2 */}
              <motion.div
                style={ghostCard2Style}
                className="absolute inset-0 w-full h-full bg-white/15 backdrop-blur border border-white/15 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_0_60px_rgba(139,0,0,0.8)] -z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
              />

              {/* Card Principal */}
              <motion.div
                ref={cardRef}
                style={cardRotationStyle}
                transition={cardTransition}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="relative w-full sm:w-[min(90vw,700px)] md:w-[min(80vw,850px)] lg:w-[min(70vw,950px)] xl:w-[min(65vw,1100px)] 2xl:w-[min(55vw,1300px)] h-[88vh] sm:h-[85vh] md:h-[80vh] lg:h-[80vh] bg-white/20 backdrop-blur border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 overflow-hidden"
              >
                <div className="w-full h-full overflow-y-auto">
                  {renderActivePage}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player */}
      <Player audioRef={playerRef} setTremor={setMusicShake} />
    </div>
  );
}

export default App;
