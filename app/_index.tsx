import { Button, useThemeMode, type ThemeMode } from "flowbite-react";
import { Link, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Mi  Precio" },
    { name: "description", content: "Bienvenido a Mi Precio" },
  ];
};

export default function Index() {
  const {toggleMode, computedMode} = useThemeMode();  
  const lightMode: ThemeMode = "light";

  

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-5xl font-bold text-gray-800 dark:text-gray-100">
            Bienvenido a <span className=" text-blue-600">Mi Precio</span>
          </h1>
        </header>
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-bold text-3xl">MENUS</h3>
          {<Button onClick={() => toggleMode()} className="text-white pb-2 pt-2 rounded-md pl-4 pr-4  bg-blue-600 focus:bg-blue-900 hover:bg-blue-700">Switch to {computedMode === lightMode ? 'Dark Mode' : 'Light Mode'} {computedMode === "light" ? "🌞" : "🌜"}
          </Button>}
          <Button className="bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus:bg-neutral-200" color="gray">ASD</Button>
          <Link className="text-white pb-2 pt-2 rounded-md pl-4 pr-4  bg-blue-600 focus:bg-blue-900 hover:bg-blue-700" to="/auth/signin">Login (WIP)</Link>
          <Link className="text-white pb-2 pt-2 rounded-md pl-4 pr-4  bg-blue-600 focus:bg-blue-900 hover:bg-blue-700" to="/auth/signup">Registro (WIP)</Link>
          <Link className="text-white pb-2 pt-2 rounded-md pl-4 pr-4  bg-blue-600 focus:bg-blue-900 hover:bg-blue-700" to="/home">Dashboard (WIP)</Link>
        </div>
      </div>
    </div>
  );
}