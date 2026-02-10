import { IoMdEye } from "react-icons/io";

export default function Views({ views }: { views: number }) {
  return (
    <div className="flex items-center gap-2">
      <IoMdEye className="text-xl sm:text-2xl text-white/80 animate-pulse" />
      <p className="font-mono text-sm sm:text-base text-white/70">
        {views ? views : 0}
      </p>
    </div>
  );
}
