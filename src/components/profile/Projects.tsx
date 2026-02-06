import { MdArrowBack } from "react-icons/md";

interface ProjectsProps {
  onClick: () => void;
}
function Projects({ onClick }: ProjectsProps) {
  return (
    <div className="relative w-full h-full">
      <button
        className="absolute top-4 left-4 hover:scale-105 transition-transform active:scale-95 cursor-pointer hover:bg-gray-400 hover:bg-opacity-40 p-2 rounded-full "
        onClick={onClick}
      >
        <MdArrowBack className="text-4xl" />
      </button>
      <h1 className="text-center mt-10">Projects</h1>
    </div>
  );
}

export default Projects;
