function Profile() {
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="h-full w-min border p-10">
        <div className="">IMG</div>
      </div>
      <div className="w-full p-4 flex flex-col justify-center">
        <p className="text-2xl font-bold">Name</p>
        <p className="text">Subtitle</p>
      </div>
    </div>
  );
}

export default Profile;
