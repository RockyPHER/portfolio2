import { MdVolumeUp } from "react-icons/md";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import Main from "./components/profile/Main";
import Projects from "./components/profile/Projects";
import Songs from "./components/profile/Songs";
import Edits from "./components/profile/Edits";

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
        <div className="w-[min(40vw,600px)] aspect-3/5 p-5 gap-4 flex flex-col justify-between items-center bg-gray-300 rounded-xl">
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
        <MdVolumeUp className="text-4xl" />
        <IoMdEye className="text-4xl animate-pulse" />
        <div>
          <IoPlay className="text-6xl animate-pulse" />
        </div>
      </div>
    </>
  );
}

export default App;
