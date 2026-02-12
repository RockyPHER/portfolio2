import Main from "./components/Main";
import Edits from "./components/Edits";
import Design from "./components/Design";
import Projects from "./components/Projects";
import Player from "./components/Player";
import Backdrop from "./components/Backdrop";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ActivePage = "main" | "projects" | "videos" | "design";

function App() {
  // ===== Estados =====
  const [show, setShow] = useState(false);
  const [viewsCount, setViewsCount] = useState(0);
  const [activePage, setActivePage] = useState<ActivePage>("main");

  // Rotação do card
  // const [rotateX, setRotateX] = useState(0);
  // const [rotateY, setRotateY] = useState(0);
  const [targetRotateX, setTargetRotateX] = useState(0);
  const [targetRotateY, setTargetRotateY] = useState(0);

  // Shake da música
  const [musicShake, setMusicShake] = useState({ x: 0, y: 0 });

  // Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLAudioElement>(null);

  // ===== Navegação =====
  const handleShowCard = useCallback(() => {
    setShow(true);
    setViewsCount((prev) => prev + 1);
  }, []);

  const navigateTo = useCallback((page: ActivePage) => {
    setActivePage(page);
  }, []);

  // ===== Rotação do card =====
  // const lerp = (start: number, end: number, t: number) =>
  //   start + (end - start) * t;

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

  // Suavização da rotação
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      // setRotateX((v) => lerp(v, targetRotateX, 0.1));
      // setRotateY((v) => lerp(v, targetRotateY, 0.1));
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetRotateX, targetRotateY]);

  // ===== Estilos memoizados =====
  const ghostCard1Style = useMemo(
    () => ({
      x: musicShake.x * 12 + 100, // Intensidade aumentada (era 3)
      y: musicShake.y * 12 + 60,
    }),
    [musicShake],
  );

  const ghostCard2Style = useMemo(
    () => ({
      x: musicShake.x * 1.5 + 50,
      y: musicShake.y * 1.5 + 30,
    }),
    [musicShake],
  );

  // ===== Renderização da página ativa =====
  const renderPage = useMemo(() => {
    const pageProps = {
      projects: { onClick: () => navigateTo("main") },
      videos: { onClick: () => navigateTo("main") },
      design: { onClick: () => navigateTo("main") },
      main: {
        views: viewsCount,
        onClickProjects: () => navigateTo("projects"),
        onClickVideos: () => navigateTo("videos"),
        onClickDesign: () => navigateTo("design"),
      },
    };

    const pages = {
      projects: <Projects {...pageProps.projects} />,
      videos: <Edits {...pageProps.videos} />,
      design: <Design {...pageProps.design} />,
      main: <Main {...pageProps.main} />,
    };

    return pages[activePage];
  }, [activePage, viewsCount, navigateTo]);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-50"
        src="https://files.catbox.moe/2dg933.mp4"
        loop
        muted
        autoPlay
        playsInline
      />

      {/* Botão Inicial Interativo */}
      <AnimatePresence>
        {!show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="z-20"
          >
            <Backdrop>
              <motion.button
                onClick={handleShowCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full h-full flex flex-col justify-center items-center cursor-pointer overflow-hidden"
              >
                {/* Efeito de brilho animado */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />

                {/* Texto principal */}
                <motion.p
                  className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 40px rgba(255,255,255,0.8)",
                      "0 0 20px rgba(255,255,255,0.5)",
                    ],
                    transform: [
                      "translateY(0) scale(1)",
                      "translateY(-5px) scale(1.05)",
                      "translateY(0) scale(1)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CLICK
                </motion.p>
              </motion.button>
            </Backdrop>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Container */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 z-10"
            style={{ perspective: "2000px" }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Cards Fantasma */}
              <motion.div
                style={ghostCard1Style}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="absolute w-[90%] sm:w-[min(90vw,700px)] md:w-[min(80vw,850px)] lg:w-[min(70vw,950px)] xl:w-[min(65vw,1100px)] 2xl:w-[min(55vw,1300px)] h-[88vh] sm:h-[85vh] md:h-[80vh] bg-linear-to-br from-red-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl shadow-2xl -z-10"
              />

              <motion.div
                style={ghostCard2Style}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                className="absolute w-[90%] sm:w-[min(90vw,700px)] md:w-[min(80vw,850px)] lg:w-[min(70vw,950px)] xl:w-[min(65vw,1100px)] 2xl:w-[min(55vw,1300px)] h-[88vh] sm:h-[85vh] md:h-[80vh] bg-linear-to-br from-purple-500/15 to-pink-500/15 backdrop-blur border border-white/15 rounded-xl md:rounded-2xl shadow-xl -z-5"
              />

              {/* Card Principal */}
              <motion.div
                ref={cardRef}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="relative w-[90%] sm:w-[min(90vw,700px)] md:w-[min(80vw,850px)] lg:w-[min(70vw,950px)] xl:w-[min(65vw,1100px)] 2xl:w-[min(55vw,1300px)] h-[88vh] sm:h-[85vh] md:h-[80vh] bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="w-full h-full p-3 sm:p-4 md:p-6 overflow-y-auto">
                  {renderPage}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Player audioRef={playerRef} setTremor={setMusicShake} />
    </div>
  );
}

export default App;
