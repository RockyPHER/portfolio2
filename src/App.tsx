import { useState } from "react";
import Projects from "./components/profile/Projects";
import Player from "./components/musicPlayer/Player";
import Main from "./components/profile/Main";
import Edits from "./components/profile/Edits";
import Design from "./components/profile/Design";

function App() {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Main Glass Container */}
      <div
        style={{
          height: isOpen ? "80vh" : "60vh"
        }}
        className={`relative w-[min(90vw,900px)] h-[min(80vh,700px)] flex flex-col justify-between items-center bg-white/20 backdrop-blur border border-white/20 rounded-2xl p-6`}>
        {stance.main && (
          <Main
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
    </div>
  );
}

export default App;
