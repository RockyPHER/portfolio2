import { FaMapMarkerAlt } from "react-icons/fa";

function Location() {
  return (
    <div className="flex justify-end items-center">
      <FaMapMarkerAlt className="inline-block mr-1" />
      <p>Minas Gerais, Brasil</p>
    </div>
  );
}

export default Location;
