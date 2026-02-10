import { MdArrowBack } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

interface EditsProps {
  onClick: () => void;
}

const EDITS = [
  {
    title: "Tokyo Night Edit",
    description: "Cyberpunk vibe / sync with beat",
    tools: ["After Effects", "Premiere"],
    duration: "0:24",
    preview:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
    link: "#",
  },
  {
    title: "Glitch Motion Pack",
    description: "Experimental glitch transitions",
    tools: ["After Effects"],
    duration: "0:18",
    preview:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800",
    link: "#",
  },
];

export default function Edits({ onClick }: EditsProps) {
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

        <h1 className="text-xl font-medium">Edits</h1>
      </div>

      {/* Scroll */}
      <div className="absolute inset-0 overflow-y-auto px-4 pb-8 pt-20 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
          {EDITS.map((edit) => (
            <div
              key={edit.title}
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-400/40"
            >
              {/* Preview */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={edit.preview}
                  alt={edit.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-4 backdrop-blur">
                    <IoPlay className="text-3xl text-white" />
                  </div>
                </div>

                {/* Duration */}
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs">
                  {edit.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-medium">{edit.title}</h2>

                <p className="mt-2 text-sm text-white/70">{edit.description}</p>

                {/* Tools */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {edit.tools.map((tool) => (
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
