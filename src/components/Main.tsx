import { BsDiscord, BsGithub, BsSpotify, BsTwitterX } from "react-icons/bs";
import { type ComponentType } from "react";

import Profile from "./Profile";
import Link from "./Link";
import Divider from "./Divider";

interface MainProps {
  onClickProjects: () => void;
  onClickVideos: () => void;
  onClickDesign: () => void;
  views: number;
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
    href: "https://open.spotify.com/user/tzdv26y90c5vbfbzknuioavqy?si=5af2447a58d048be",
    label: "Spotify",
    Icon: BsSpotify,
  },
];

const OPTIONS = [
  {
    name: "Projetos",
    description: "Apps, bots e experimentos",
    gradient: "from-red-500/20 to-black-500/20",
  },
] as const;

export default function Main({
  onClickProjects,
  onClickVideos,
  onClickDesign,
}: MainProps) {
  const handleOptionClick = (index: number) => {
    const callbacks = [onClickProjects, onClickVideos, onClickDesign];
    callbacks[index]?.();
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 sm:gap-6 md:gap-8 px-1.5 sm:px-3 md:px-4 lg:px-6 overflow-y-auto pr-1.5 sm:pr-2.5 md:pr-3 lg:pr-3">
      {/* PROFILE */}
      <div className="shrink-0">
        <Profile />
      </div>

      {/* OPTIONS */}
      <div className="flex flex-col items-center w-full gap-3 sm:gap-4">
        <Divider />

        <div className="grid w-full max-w-3xl gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
          {OPTIONS.map((option, index) => (
            <button
              key={option.name}
              onClick={() => handleOptionClick(index)}
              className={`
                ${OPTIONS.length === 1 ? "sm:col-span-2" : ""}
                group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl 
                border border-white/20 bg-white/10 
                p-4 sm:p-5 md:p-6 text-left 
                transition-all duration-300 
                hover:-translate-y-1 hover:border-white/40 
                cursor-pointer
              `}
            >
              {/* Gradient Hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${option.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
              />

              <div className="relative z-10">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                  {option.name}
                </h2>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/70">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <Divider />
      </div>

      {/* SOCIAL */}
      <div className="shrink-0 mt-auto">
        <nav className="flex items-center justify-center gap-2 sm:gap-4 pb-4">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <Link key={label} href={href} aria-label={label}>
              {/* Tooltip simples ou efeito de brilho interno */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-md transition-opacity group-hover:opacity-100" />

              <Icon className="relative z-10 text-xl sm:text-2xl md:text-2xl text-white/80 transition-colors group-hover:text-white" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
