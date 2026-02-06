import { IoMdEye } from "react-icons/io";

function Views() {
  return (
    <div className="flex gap-2 items-center">
      <IoMdEye className="text-2xl animate-pulse" />
      <p className="font-mono text-gray-500">0</p>
    </div>
  );
}

export default Views;
