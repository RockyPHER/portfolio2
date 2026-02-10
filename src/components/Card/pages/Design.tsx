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
      <div className="absolute left-4 top-4 z-20 flex items-center gap-3">
        <button
          onClick={onClick}
          className="cursor-pointer rounded-full p-2 transition hover:scale-105 hover:bg-white/20 active:scale-95"
        >
          <MdArrowBack className="text-2xl" />
        </button>

        <h1 className="text-xl font-medium">Design</h1>
      </div>

      {/* Scroll Content */}
      <div className="absolute inset-0 overflow-y-auto px-4 pb-8 pt-20 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
          {DESIGNS.map((design) => (
            <div
              key={design.title}
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-400/40"
            >
              {/* Preview Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={design.preview}
                  alt={design.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium">{design.title}</h2>

                  <a
                    href={design.link}
                    target="_blank"
                    className="opacity-0 transition group-hover:opacity-100 hover:text-blue-400"
                  >
                    <BsBoxArrowUpRight />
                  </a>
                </div>

                <p className="mt-2 text-sm text-white/70">
                  {design.description}
                </p>

                {/* Tools */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {design.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
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
