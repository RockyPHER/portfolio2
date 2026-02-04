import Card from "./components/card";
import Divider from "./components/divider";
import Profile from "./components/profile";

function App() {
  return (
    <>
      <div className="min-h-screen p-[10vh] flex justify-center items-center">
        <div className="w-[min(40vw,500px)] aspect-3/5 p-5 gap-4 flex flex-col items-center bg-gray-300 rounded-xl">
          <Profile />
          <Divider />
          <Card name="Projetos" />
          <Card name="Vídeos" />
          <Card name="Músicas" />
          <Divider />
          <div className="w-full p-4 flex justify-center"></div>
        </div>
      </div>
    </>
  );
}

export default App;
