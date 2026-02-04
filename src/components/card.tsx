interface CardProps {
  name: string;
}

function Card({ name }: CardProps) {
  return (
    <div className="w-full p-3 bg-amber-200 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer">
      <div>{name}</div>
    </div>
  );
}

export default Card;
