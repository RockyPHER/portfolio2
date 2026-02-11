import { MdArrowBack } from "react-icons/md";

interface WritingsProps {
  onClick: () => void;
}
function Writings({ onClick }: WritingsProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Header */}
      <div className="absolute left-2 sm:left-4 top-3 sm:top-4 z-20 flex items-center gap-2 sm:gap-3">
        <button
          onClick={onClick}
          className="cursor-pointer rounded-full p-1.5 sm:p-2 transition hover:scale-105 hover:bg-white/20 active:scale-95"
        >
          <MdArrowBack className="text-lg sm:text-2xl" />
        </button>

        <h1 className="text-base sm:text-lg md:text-xl font-medium\">
          Writings
        </h1>
      </div>

      {/* Content */}
      <div className="absolute inset-0 overflow-y-auto px-2 sm:px-4 md:px-6 pb-6 sm:pb-8 pt-16 sm:pt-20 flex items-center justify-center\">
        <p className="text-sm sm:text-base text-white/60 text-center\">
          Conteúdo em breve...
        </p>
      </div>
    </div>
  );
}

export default Writings;
