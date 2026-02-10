import { FaMapMarkerAlt } from "react-icons/fa";

export default function Location() {
  return (
    <div className="flex items-center gap-1">
      <FaMapMarkerAlt className="text-sm sm:text-base text-white/80" />
      <p className="font-mono text-sm sm:text-base text-white/70">
        Minas Gerais, Brasil
      </p>
    </div>
  );
}
