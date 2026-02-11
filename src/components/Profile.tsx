import Views from "./Views";
import Location from "./Location";

interface Props {
  views: number;
}

export default function Profile({ views }: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-3 md:px-4 pt-2 sm:pt-4 md:pt-6 lg:pt-8 text-center sm:flex-row sm:justify-center sm:pt-4 md:pt-6 lg:pt-8 sm:text-left">
      {/* Avatar */}
      <div className="h-20 w-20 sm:h-24 md:h-28 lg:h-32 sm:w-24 md:w-28 lg:w-32 shrink-0 overflow-hidden rounded-full border border-white/20 bg-gray-200">
        <img
          src="https://i.pinimg.com/1200x/42/c0/b3/42c0b3324041da597ee3c4aa3708c5ca.jpg"
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 sm:items-start">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white font-mono">
          Maçaneta
        </p>
        <p className="text-xs sm:text-sm md:text-base text-white/70 font-mono">
          Fullstack Developer
        </p>

        <div className="mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white/60">
          <Views views={views} />
          <span className="text-white/40">|</span>
          <Location />
        </div>
      </div>
    </div>
  );
}
