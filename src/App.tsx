import { useState } from "react";
import Projects from "./components/profile/Projects";
import Player from "./components/musicPlayer/Player";
import Songs from "./components/profile/Songs";
import Edits from "./components/profile/Edits";
import Main from "./components/profile/Main";

function App() {
  const [stance, setStance] = useState({
    main: true,
    projects: false,
    videos: false,
    music: false,
  });

  const handleOnClickProjects = () => {
    setStance({ ...stance, main: false, projects: true });
  };

  const handleOnClickVideos = () => {
    setStance({ ...stance, main: false, videos: true });
  };

  const handleOnClickMusic = () => {
    setStance({ ...stance, main: false, music: true });
  };

  const handleOnClickBack = () => {
    setStance({
      ...stance,
      main: true,
      projects: false,
      videos: false,
      music: false,
    });
  };

  return (
    <>
      <div className="min-h-screen p-[10vh] flex flex-col gap-2 justify-center items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative w-[min(40vw,600px)] aspect-3/5 flex flex-col justify-between items-center bg-gray-300 rounded-xl">
          {stance.main && (
            <Main
              onClickMusic={handleOnClickMusic}
              onClickProjects={handleOnClickProjects}
              onClickVideos={handleOnClickVideos}
            />
          )}
          {stance.projects && <Projects onClick={handleOnClickBack} />}
          {stance.videos && <Songs onClick={handleOnClickBack} />}
          {stance.music && <Edits onClick={handleOnClickBack} />}
        </div>
        <Player />
      </div>
    </>
  );
}

export default App;
