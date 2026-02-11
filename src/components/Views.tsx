import { IoMdEye } from "react-icons/io";

export default function Views({ views }: { views: number }) {
  return (
    <div className="flex group items-center gap-2 relative">
      <IoMdEye className="text-xl sm:text-2xl text-white/80 animate-pulse" />
      <p className="font-mono text-sm sm:text-base text-white/70">
        {views ? views : 0}
      </p>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Total views
      </span>
    </div>
  );
}
