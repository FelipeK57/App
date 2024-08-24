import { useEffect } from "react";
import EnterName from "./EnterName";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaksList";
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
        <main className="flex ">
          <Sidebar />
          <TaskList  />
        </main>
      ) : (
        <EnterName />
      )}
    </div>
  );
}

export default Home;
