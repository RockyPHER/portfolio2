import { MdArrowBack } from "react-icons/md";

interface EditsProps {
  onClick: () => void;
}
function Edits({ onClick }: EditsProps) {
  return (
    <div>
      <button onClick={onClick}>
        <MdArrowBack className="text-4xl" />
      </button>
      <h1>Edits</h1>
    </div>
  );
}

export default Edits;
