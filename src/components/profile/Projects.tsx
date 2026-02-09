import { MdArrowBack } from "react-icons/md";

interface ProjectsProps {
  onClick: () => void;
}

function Projects({ onClick }: ProjectsProps) {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Header */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-3">
        <button
          onClick={onClick}
          className="cursor-pointer rounded-full p-2 transition-all hover:scale-105 hover:bg-gray-400/40 active:scale-95"
        >
          <MdArrowBack className="text-2xl sm:text-3xl" />
        </button>

        <h1 className="text-xl font-medium sm:text-2xl">Projects</h1>
      </div>

      {/* Scroll Content */}
      <div className="absolute inset-0 overflow-y-auto px-4 pb-6 pt-20 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-48 w-full rounded-xl bg-gray-400 sm:h-56"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
