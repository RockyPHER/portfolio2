import { useState } from "react";
import Projects from "./components/Card/pages/Projects";
import Player from "./components/musicPlayer/Player";
import Main from "./components/Card/Main";
import Edits from "./components/Card/pages/Edits";
import Design from "./components/Card/pages/Design";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./components/Backdrop";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [Show, setShow] = useState(false);
  const [nViews, setNViews] = useState(0);

  const handleOnClick = () => {
    setShow(true);
    setNViews((prev) => prev + 1);
  };

  const [stance, setStance] = useState({
    main: true,
    projects: false,
    videos: false,
    design: false,
  });

  const handleOnClickProjects = () => {
    setStance({ ...stance, main: false, projects: true });
  };

  const handleOnClickVideos = () => {
    setStance({ ...stance, main: false, videos: true });
  };

  const handleOnClickDesign = () => {
    setStance({ ...stance, main: false, design: true });
  };

  const handleOnClickBack = () => {
    setStance({
      ...stance,
      main: true,
      projects: false,
      videos: false,
      design: false,
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/src/assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {!Show && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Backdrop>
            <button
              className="w-full h-full flex justify-center items-center cursor-pointer"
              onClick={handleOnClick}
            >
              <p className="text-3xl">CLICK</p>
            </button>
          </Backdrop>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        {Show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Main Glass Container */}
            <div
              style={{
                height: isOpen ? "80vh" : "60vh",
              }}
              className={`relative w-[min(90vw,900px)] h-[min(80vh,700px)] flex flex-col justify-between items-center bg-white/20 backdrop-blur border border-white/20 rounded-2xl p-6`}
            >
              {stance.main && (
                <Main
                  views={nViews}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  onClickDesign={handleOnClickDesign}
                  onClickProjects={handleOnClickProjects}
                  onClickVideos={handleOnClickVideos}
                />
              )}

              {stance.projects && <Projects onClick={handleOnClickBack} />}
              {stance.videos && <Edits onClick={handleOnClickBack} />}
              {stance.design && <Design onClick={handleOnClickBack} />}
            </div>

            {/* Player - Bottom Center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <Player />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
