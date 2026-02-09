import { BsDiscord, BsGithub, BsSpotify, BsTwitterX } from "react-icons/bs";
import { useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Divider from "../Divider";
import Profile from "../Profile";
import Link from "../Link";

interface MainProps {
  onClickProjects: () => void;
  onClickVideos: () => void;
  onClickDesign: () => void;
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

const CARDS = [
  {
    name: "Projetos",
    description: "Apps, bots e experimentos",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Edits",
    description: "Motion + video edits",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Design",
    description: "UI, concepts e assets",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Writing",
    description: "Posts, articles e essays",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
] as const;

export default function Main({
  onClickProjects,
  onClickVideos,
  onClickDesign,
  isOpen,
  setIsOpen,
}: MainProps) {
  const handleCardClick = (index: number) => {
    const callbacks = [onClickProjects, onClickVideos, onClickDesign];
    callbacks[index]?.();
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 px-4 sm:px-6">
      {/* PROFILE */}
      <div className="shrink-0">
        <Profile />
      </div>

      {/* EXPANDABLE SECTION */}
      <div className="flex flex-col items-center w-full">
        {/* Divider com botão */}
        <div className="relative w-full flex items-center justify-center">
          <Divider />

          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="absolute flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:scale-110 hover:bg-white/20 cursor-pointer"
              aria-label="Expandir menu"
            />
          )}
        </div>

        {/* CARDS ANIMADOS */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden w-full"
            >
              <div className="flex justify-center py-4">
                <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
                  {CARDS.map((card, index) => (
                    <button
                      key={card.name}
                      onClick={() => handleCardClick(index)}
                      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/40 cursor-pointer"
                    >
                      {/* Gradient Hover */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                      />

                      <div className="relative z-10">
                        <h2 className="text-xl font-semibold">{card.name}</h2>
                        <p className="mt-2 text-sm text-white/70">
                          {card.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider inferior opcional */}
              <Divider />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SOCIAL */}
      <div className="shrink-0">
        <nav className="flex justify-center gap-5 pb-2">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <Link key={label} href={href} aria-label={label}>
              <Icon className="text-2xl transition hover:scale-110" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
