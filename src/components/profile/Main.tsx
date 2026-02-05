import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import Card from "../Card";
import Divider from "../Divider";
import Profile from "../Profile";

interface MainProps {
  onClickProjects: () => void;
  onClickVideos: () => void;
  onClickMusic: () => void;
}

function Main({ onClickProjects, onClickVideos, onClickMusic }: MainProps) {
  return (
    <>
      <Profile />
      <Divider />
      <div className="w-full h-full gap-2 flex flex-col">
        <Card name="Projetos" onClick={onClickProjects} />
        <Card name="Vídeos" onClick={onClickVideos} />
        <Card name="Músicas" onClick={onClickMusic} />
      </div>
      <Divider />
      <div className="w-full p-4 gap-2 flex justify-center">
        <BsDiscord className="text-4xl" />
        <BsTwitterX className="text-4xl" />
        <BsGithub className="text-4xl" />
      </div>
    </>
  );
}

export default Main;
