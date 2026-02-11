import { BsDiscord, BsGithub, BsSpotify, BsTwitterX } from "react-icons/bs";
import { type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Profile from "./Profile";
import Link from "./Link";
import Divider from "./Divider";

interface MainProps {
  onClickProjects: () => void;
  onClickVideos: () => void;
  onClickDesign: () => void;
  views: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  { href: "https://open.spotify.com", label: "Spotify", Icon: BsSpotify },
];

const OPTIONS = [
  {
    name: "Projetos",
    description: "Apps, bots e experimentos",
    gradient: "from-red-500/20 to-black-500/20",
  },
  {
    name: "Edits",
    description: "Motion + video edits",
    gradient: "from-red-500/20 to-pink-500/20",
  },
  {
    name: "Design",
    description: "UI, concepts e assets",
    gradient: "from-red-500/20 to-teal-500/20",
  },
  {
    name: "Writing",
    description: "Posts, articles e essays",
    gradient: "from-red-500/20 to-orange-500/20",
  },
] as const;

export default function Main({
  onClickProjects,
  onClickVideos,
  onClickDesign,
  views,
  isOpen,
  setIsOpen,
}: MainProps) {
  const handleoptionClick = (index: number) => {
    const callbacks = [onClickProjects, onClickVideos, onClickDesign];
    callbacks[index]?.();
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-1.5 sm:px-3 md:px-4 lg:px-6 overflow-y-auto pr-1.5 sm:pr-2.5 md:pr-3 lg:pr-3">
      {/* PROFILE */}
      <div className="shrink-0">
        <Profile views={views} />
      </div>

      {/* EXPANDABLE SECTION */}
      <div className="flex flex-col items-center w-full">
        {/* Divider com botão */}
        <div className="relative w-full flex items-center justify-center">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="absolute w-full h-full p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-dashed border-white/20 transition hover:bg-white/20 cursor-pointer"
              aria-label="Expandir menu"
            >
              <span className="text-xs sm:text-sm md:text-base font-medium">
                Explore
              </span>
            </button>
          )}
        </div>

        {/* OPTIONS ANIMADOS */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden w-full"
            >
              <div className="flex justify-center py-1 sm:py-2 md:py-3 lg:py-4">
                <div className="grid w-full max-w-3xl gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2">
                  {OPTIONS.map((option, index) => (
                    <button
                      key={option.name}
                      onClick={() => handleoptionClick(index)}
                      className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 bg-white/10 p-3 sm:p-2 md:p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/40 cursor-pointer"
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
              </div>

              {/* Divider inferior opcional */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Divider />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SOCIAL */}
      <div className="shrink-0">
        <nav className="flex justify-center gap-3 sm:gap-4 md:gap-5 pb-1 sm:pb-2">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <Link key={label} href={href} aria-label={label}>
              <Icon className="text-lg sm:text-xl md:text-2xl transition hover:scale-110" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
