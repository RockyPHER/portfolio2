import { BsDiscord, BsGithub, BsSpotify, BsTwitterX } from "react-icons/bs";
import Card from "../Card";
import Divider from "../Divider";
import Profile from "../Profile";
import Link from "../Link";

interface MainProps {
  onClickProjects: () => void;
  onClickVideos: () => void;
  onClickMusic: () => void;
}

function Main({ onClickProjects, onClickVideos, onClickMusic }: MainProps) {
  return (
    <div className="w-full h-full gap-4 p-6 flex flex-col">
      <Profile />
      <Divider />
      <div className="w-full h-full gap-2 flex flex-col">
        <Card name="Projetos" onClick={onClickProjects} />
        <Card name="Vídeos" onClick={onClickVideos} />
        <Card name="Músicas" onClick={onClickMusic} />
      </div>
      <Divider />
      <div className="w-full gap-2 flex justify-center items-center">
        <Link>
          <BsDiscord className="text-4xl" />
        </Link>
        <Link>
          <BsTwitterX className="text-4xl" />
        </Link>
        <Link href="https://github.com/RockyPHER">
          <BsGithub className="text-4xl" />
        </Link>
        <Link href="https://open.spotify.com/user/tzdv26y90c5vbfbzknuioavqy?si=9380300972b34a50">
          <BsSpotify className="text-4xl" />
        </Link>
      </div>
    </div>
  );
}

export default Main;
