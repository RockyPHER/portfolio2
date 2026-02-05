import { MdArrowBack } from "react-icons/md";

interface SongsProps {
  onClick: () => void;
}
function Songs({ onClick }: SongsProps) {
  return (
    <div>
      <button onClick={onClick}>
        <MdArrowBack className="text-4xl" />
      </button>
      <h1>Songs</h1>
    </div>
  );
}

export default Songs;
