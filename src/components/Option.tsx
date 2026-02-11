interface OptionProps {
  name: string;
  onClick?: () => void;
}

function Option({ name, onClick }: OptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-24 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
    >
      <div className="text-white">{name}</div>
    </button>
  );
}

export default Option;
