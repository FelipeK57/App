import { useEffect } from "react";
import EnterName from "./EnterName";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";
import ToggleMode from "@/components/ToggleMode";
function Home() {
  useEffect(() => {
    const darkMode = localStorage.getItem("theme") === "true";
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div>
      {localStorage.getItem("name") ? (
        <main className="flex h-screen bg-bg-light dark:bg-bg-dark">
          <Sidebar />
          <section className="flex-1 md:ml-64 lg:ml-80 py-6 px-2 animate-fade-down overflow-auto-y overflow-x-hidden flex flex-col items-center justify-center h-screen w-full bg-bg-light dark:bg-bg-dark">
            <div className="flex flex-col gap-8 px-4 h-screen w-full">
              <h1 className="text-4xl mt-20 md:mt-0 font-semibold text-gray-800 dark:text-slate-200">
                Bienvenido {localStorage.getItem("name")}
              </h1>
              <div>
                  <Outlet />
              </div>
            </div>
            <div className="animate-fade-left flex w-full items-end justify-end p-4 ">
              <ToggleMode />
            </div>
          </section>
        </main>
      ) : (
        <EnterName />
      )}
    </div>
  );
}

export default Home;
