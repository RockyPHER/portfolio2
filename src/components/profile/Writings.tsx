import { MdArrowBack } from "react-icons/md";

interface WritingsProps {
  onClick: () => void;
}
function Writings({ onClick }: WritingsProps) {
  return (
    <div>
      <button onClick={onClick}>
        <MdArrowBack className="text-4xl" />
      </button>
      <h1>Writings</h1>
    </div>
  );
}

export default Writings;
