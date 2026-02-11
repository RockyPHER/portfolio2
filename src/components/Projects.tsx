import { MdArrowBack } from "react-icons/md";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";

interface ProjectsProps {
  onClick: () => void;
}

const PROJECTS = [
  {
    title: "Music Player",
    description: "Custom audio player with smooth motion UI",
    tech: ["React", "TypeScript", "Framer Motion"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio",
    description: "Personal portfolio with glassmorphism",
    tech: ["React", "Tailwind"],
    github: "#",
    live: "#",
  },
];

export default function Projects({ onClick }: ProjectsProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Header */}
      <div className="absolute left-2 sm:left-4 top-3 sm:top-4 z-20 flex items-center gap-2 sm:gap-3">
        <button
          onClick={onClick}
          className="cursor-pointer rounded-full p-1.5 sm:p-2 transition hover:scale-105 hover:bg-white/20 active:scale-95"
        >
          <MdArrowBack className="text-lg sm:text-2xl" />
        </button>

        <h1 className="text-base sm:text-lg md:text-xl font-medium">
          Projects
        </h1>
      </div>

      {/* Scroll */}
      <div className="absolute inset-0 overflow-y-auto px-2 sm:px-4 md:px-6 pb-6 sm:pb-8 pt-16 sm:pt-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-lg sm:rounded-xl border border-white/20 bg-white/10 p-3 sm:p-4 md:p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-400/40"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base sm:text-lg font-medium">
                  {project.title}
                </h2>

                <div className="flex gap-2 opacity-0 transition group-hover:opacity-100 text-sm sm:text-base">
                  <a
                    href={project.github}
                    target="_blank"
                    className="hover:text-blue-400"
                  >
                    <BsGithub />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    className="hover:text-blue-400"
                  >
                    <BsBoxArrowUpRight />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/70">
                {project.description}
              </p>

              {/* Tech */}
              <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/10 px-2 py-0.5 sm:py-1 text-xs text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
