import { MdVolumeUp } from "react-icons/md";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import Main from "./components/profile/Main";
import Projects from "./components/profile/Projects";
import Songs from "./components/profile/Songs";
import Edits from "./components/profile/Edits";
import Player from "./components/musicPlayer/Player";

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
      <div className="min-h-screen p-[10vh] flex flex-col gap-10 justify-center items-center">
        <button className="fixed top-10 left-10">
          <MdVolumeUp className="text-4xl" />
        </button>
        <div className="relative w-[min(40vw,600px)] aspect-3/5 p-5 gap-4 flex flex-col justify-between items-center bg-gray-300 rounded-xl">
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
          <IoMdEye className="absolute bottom-1 left-2 text-3xl animate-pulse opacity-70 text-gray-500" />
        </div>
        <Player />
      </div>
    </>
  );
}

export default App;
