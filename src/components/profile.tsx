import Views from "./Views";
import Location from "./Location";

function Profile() {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-4 pt-6 text-center sm:flex-row sm:justify-center sm:gap-6 sm:pt-10 sm:text-left">
      {/* Avatar */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-gray-200 sm:h-32 sm:w-32">
        <img
          src="https://i.pinimg.com/1200x/42/c0/b3/42c0b3324041da597ee3c4aa3708c5ca.jpg"
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <p className="text-xl font-bold sm:text-2xl">Maçaneta</p>
        <p className="text-sm text-gray-700 sm:text-base">
          Fullstack Developer
        </p>

        <div className="mt-1 flex items-center gap-2 text-sm">
          <Views />
          <span className="text-gray-500">|</span>
          <Location />
        </div>
      </div>
    </div>
  );
}

export default Profile;
