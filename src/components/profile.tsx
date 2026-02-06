import Views from "./Views";
import Location from "./Location";

function Profile() {
  return (
    <div className="w-full h-auto pt-10 px-5 flex flex-col items-center">
      <div className="h-full w-min">
        <div className="bg-gray-200 w-48 h-48 rounded-full">
          <img
            src="https://i.pinimg.com/1200x/42/c0/b3/42c0b3324041da597ee3c4aa3708c5ca.jpg"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div className="w-full p-4 flex flex-col justify-center">
        <p className="text-2xl font-bold">Maçaneta</p>
        <p className="text">Fullstack Developer</p>
        <div className="flex justify-end items-center mt-2">
          <Views />
          <p className="text-gray-500 mx-2">|</p>
          <Location />
        </div>
      </div>
    </div>
  );
}

export default Profile;
