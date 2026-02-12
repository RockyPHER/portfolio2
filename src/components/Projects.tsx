import { MdArrowBack } from "react-icons/md";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";
import { motion, type Variants } from "framer-motion";

interface ProjectsProps {
  onClick: () => void;
}

const PROJECTS = [
  {
    title: "Waifufu",
    description: "CRUD app for showcasing waifus with cute UI",
    tech: ["React", "TypeScript", "ExpressJS", "Prisma"],
    github: "https://github.com/RockyPHER/waifufu-fullstack",
    live: "https://waifufu-fullstack.vercel.app/",
    index: "01",
  },
  {
    title: "Pomodoro--",
    description: "Strange pomodoro timer based on tasks instead of time",
    tech: ["React", "Tailwind"],
    github: "https://github.com/RockyPHER/pomodoro--",
    live: "https://pomodoro-mocha-one.vercel.app/",
    index: "02",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Projects({ onClick }: ProjectsProps) {
  return (
    <div className="relative h-full w-full select-none">
      {/* Header - Mais nítido e integrado */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onClick}
          className="group cursor-pointer rounded-full bg-white/10 p-2.5 backdrop-blur-md border border-white/20 transition-all hover:bg-white/30 active:scale-90"
        >
          <MdArrowBack className="text-xl text-white group-hover:scale-110 transition-transform" />
        </button>
        <div>
          <h1 className="text-xs font-bold tracking-[0.3em] uppercase text-white/60">
            Portfolio
          </h1>
          <h2 className="text-2xl font-black text-white leading-tight">
            PROJECTS
          </h2>
        </div>
      </div>

      {/* Grid de Projetos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 pb-10"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/10 p-6 backdrop-blur-md
                       transition-all duration-300
                       cursor-pointer
                       hover:bg-white/20 hover:border-white/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
          >
            {/* Efeito de Reflexo (Glint) no topo do card */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black tracking-widest text-gray/40 uppercase">
                  Exp. {project.index}
                </span>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-black/20 text-white/70 hover:text-white hover:bg-black/40 transition-all"
                  >
                    <BsGithub className="text-lg" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/20 text-white/70 hover:text-white hover:bg-white/40 transition-all"
                  >
                    <BsBoxArrowUpRight className="text-lg" />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
                {project.title}
              </h3>

              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                {project.description}
              </p>

              {/* Tech Tags - Estilo 'Pill' Glass */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-black/10 border border-white/20 px-3 py-1 text-[10px] font-bold text-white tracking-wide backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Círculo decorativo de fundo no hover */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
