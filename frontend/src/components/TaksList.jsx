function TaskList() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-8 h-screen w-full bg-slate-50 dark:bg-slate-950">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-slate-200">
          Bienvenido {localStorage.getItem("name")}
        </h1>
      </div>
    </div>
  );
}

export default TaskList;
