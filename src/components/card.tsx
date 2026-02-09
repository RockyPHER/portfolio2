interface CardProps {
  name: string;
  onClick?: () => void;
}

function Card({ name, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-24 p-3 bg-amber-200 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
    >
      <div>{name}</div>
    </button>
  );
}

export default Card;
