import { BsDiscord, BsGithub, BsSpotify, BsTwitterX } from "react-icons/bs";
import type { ComponentType } from "react";

import Card from "../Card";
import Divider from "../Divider";
import Profile from "../Profile";
import Link from "../Link";

interface MainProps {
  onClickProjects: () => void;
  onClickVideos: () => void;
  onClickMusic: () => void;
}

interface SocialLink {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://discord.com", label: "Discord", Icon: BsDiscord },
  { href: "https://twitter.com", label: "Twitter", Icon: BsTwitterX },
  { href: "https://github.com/RockyPHER", label: "GitHub", Icon: BsGithub },
  {
    href: "https://open.spotify.com/user/tzdv26y90c5vbfbzknuioavqy?si=9380300972b34a50",
    label: "Spotify",
    Icon: BsSpotify,
  },
];

export default function Main({
  onClickProjects,
  onClickVideos,
  onClickMusic,
}: MainProps) {
  const cards = [
    { name: "Projetos", onClick: onClickProjects },
    { name: "Vídeos", onClick: onClickVideos },
    { name: "Músicas", onClick: onClickMusic },
  ] as const;

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 sm:p-6">
      <Profile />
      <Divider />

      <div className="flex flex-1 flex-col gap-2">
        {cards.map(({ name, onClick }) => (
          <Card key={name} name={name} onClick={onClick} />
        ))}
      </div>

      <Divider />

      <nav className="flex justify-center gap-4 sm:gap-6">
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <Link key={label} href={href} aria-label={label}>
            <Icon className="text-2xl transition-transform hover:scale-110 sm:text-3xl md:text-4xl" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
