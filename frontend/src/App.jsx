import EnterName from "./pages/EnterName";

function App() {
  return (
    <div>
      {localStorage.getItem("name") ? (
        <div className="flex flex-col items-center justify-center gap-8 h-screen w-full bg-slate-50">
          <h1 className="text-4xl font-semibold text-gray-800">
            Bienvenido {localStorage.getItem("name")}
          </h1>
        </div>
      ) : (
        <EnterName />
      )}
    </div>
  );
}

export default App;
