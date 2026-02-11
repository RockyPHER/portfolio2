import { MdArrowBack } from "react-icons/md";
import { BsBoxArrowUpRight } from "react-icons/bs";

interface DesignProps {
  onClick: () => void;
}

const DESIGNS = [
  {
    title: "Glass UI System",
    description: "Glassmorphism interface exploration",
    tools: ["Figma", "Photoshop"],
    preview:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800",
    link: "#",
  },
  {
    title: "Music Player UI",
    description: "Audio player interface concept",
    tools: ["Figma"],
    preview:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800",
    link: "#",
  },
];

export default function Design({ onClick }: DesignProps) {
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

        <h1 className="text-base sm:text-lg md:text-xl font-medium">Design</h1>
      </div>

      {/* Scroll Content */}
      <div className="absolute inset-0 overflow-y-auto px-2 sm:px-4 md:px-6 pb-6 sm:pb-8 pt-16 sm:pt-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2 sm:gap-3 md:gap-5 sm:grid-cols-2">
          {DESIGNS.map((design) => (
            <div
              key={design.title}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 bg-white/10 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-400/40"
            >
              {/* Preview Image */}
              <div className="h-32 sm:h-40 md:h-48 w-full overflow-hidden">
                <img
                  src={design.preview}
                  alt={design.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3 md:p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base sm:text-lg font-medium">
                    {design.title}
                  </h2>

                  <a
                    href={design.link}
                    target="_blank"
                    className="opacity-0 transition group-hover:opacity-100 hover:text-blue-400 text-sm sm:text-base shrink-0"
                  >
                    <BsBoxArrowUpRight />
                  </a>
                </div>

                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/70">
                  {design.description}
                </p>

                {/* Tools */}
                <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                  {design.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-white/10 px-2 py-0.5 sm:py-1 text-xs text-white/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
