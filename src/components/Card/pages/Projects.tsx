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
      <div className="absolute left-4 top-4 z-20 flex items-center gap-3">
        <button
          onClick={onClick}
          className="cursor-pointer rounded-full p-2 transition hover:scale-105 hover:bg-white/20 active:scale-95"
        >
          <MdArrowBack className="text-2xl" />
        </button>

        <h1 className="text-xl font-medium">Projects</h1>
      </div>

      {/* Scroll */}
      <div className="absolute inset-0 overflow-y-auto px-4 pb-8 pt-20 sm:px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-400/40"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-medium">{project.title}</h2>

                <div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
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
              <p className="mt-2 text-sm text-white/70">
                {project.description}
              </p>

              {/* Tech */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
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
