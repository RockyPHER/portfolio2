import { MdArrowBack } from "react-icons/md";

interface ProjectsProps {
  onClick: () => void;
}
function Projects({ onClick }: ProjectsProps) {
  return (
    <div>
      <button onClick={onClick}>
        <MdArrowBack className="text-4xl" />
      </button>
      <h1>Projects</h1>
    </div>
  );
}

export default Projects;
