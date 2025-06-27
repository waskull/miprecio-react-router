import { Label, Popover, Spinner, TextInput, ToggleSwitch, useThemeMode, type ThemeMode } from "flowbite-react";
import { Link, useLocation } from "react-router";
import AddUserModal from "../user/addUserModal";
import AddCategoryModel from "~/category/addCategoryModel";
import AddProductModal from "~/product/addProductModal";
import AddCompanyModal from "~/company/addCompanyModal";
import { RoleObject } from "~/util/role-enum";
import { useState } from "react";
import type { IUserSession } from "~/user/user";
export default function NavBar({ userData = null }: { userData: IUserSession | null }) {
  /* const [userData, setUserData] = useState<IUserSession | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let data = await fetch("/users/getuserinfo/");
        const json = await data.json();
        console.log("data: ", json);
        setUserData(json.message ? null : json);
      }
      catch (e) {
        console.log("ERROR:", e);
        setUserData(null);
      }
    }
    getData();
  }, []); */
  const { pathname } = useLocation();
  const { toggleMode, computedMode } = useThemeMode();
  const lightMode: ThemeMode = "light";
  return (
    <div className="block flex-nowrap sticky w-full max-w-screen-xl top-0 z-10 items-center justify-between border-b text-gray-950 border-gray-200 dark:border-gray-700 bg-white p-4  shadow shadow-black/8 dark:shadow-black/20 dark:bg-gray-800 backdrop-filter backdrop-blur-md bg-opacity-30 dark:bg-opacity-80">
      <div className="mb-1 w-full">
        <div className="sm:flex">
          <div className="mb-3 hidden items-center pt-1 dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
            <span className="self-center text-2xl text-center font-bold dark:text-white pr-4">
              {pathname.toUpperCase().replace("/", "") === "HOME" && "Inicio"}
              {pathname.toUpperCase().replace("/", "") === "USERS" && "Usuarios"}
              {pathname.toUpperCase().replace("/", "") === "STORE" && "Tiendas"}
              {pathname.includes("store/") && "Tienda"}
              {pathname.toUpperCase().replace("/", "") === "COMPANIES" && "Compañias"}
              {pathname.toUpperCase().replace("/", "") === "CATEGORIES" && "Categorias"}
              {pathname.toUpperCase().replace("/", "") === "PRODUCTS" && "Productos"}
              {pathname.toUpperCase().replace("/", "") === "PROFILE" && "Perfil"}
              {pathname.toUpperCase().replace("/", "") === "PASSWORD" && "Cambiar Contraseña"}
            </span>
          </div>
          <div className="ml-auto flex items-center space-x-2 sm:space-x-3">

            {pathname !== "/home" && (
              <form className="lg:pr-3 pb-1">
                <Label htmlFor="search" className="sr-only">
                  Buscar
                </Label>
                <div className="relative mt-1 lg:w-96 xl:w-96">
                  <TextInput
                    id="search"
                    name="search"
                    placeholder="Buscar..."
                  />
                </div>
              </form>
            )}
            {pathname === "/users" && <AddUserModal />}
            {pathname === "/categories" && <AddCategoryModel />}
            {pathname === "/products" && <AddProductModal />}
            {pathname === "/companies" && <AddCompanyModal isAdmin={RoleObject.admin === userData?.role} />}
            <div className="flex items-center gap-x-3">
              <ToggleSwitch label={computedMode === lightMode ? "🌜" : "🌞"} checked={computedMode === lightMode ? true : false} onChange={() => toggleMode()}></ToggleSwitch>



              <UserDropdown userData={userData} />
              {/* <Dropdown
                label={<div className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-gray-500 dark:hover:text-gray-400 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white">
                  <Avatar alt="User settings" img="/favicon.ico" rounded />
                  <span className="ms-2">{userData?.fullname}</span>
                </div>}
                arrowIcon={false}
                inline
              >
                <DropdownHeader>
                  <span className="block text-sm">{RoleObject.admin === userData?.role ? "Administrador" : RoleObject.partner === userData?.role ? "Socio" : "Usuario"}</span>
                  <span className="block truncate text-sm font-medium">{userData?.email}</span>
                </DropdownHeader>
                <DropdownItem>Inicio</DropdownItem>
                <DropdownItem>Editar perfil</DropdownItem>
                <DropdownItem>Cambiar contraseña</DropdownItem>
                <DropdownDivider />
                <DropdownItem className="text-sm text-gray-700 hover:text-gray-200 dark:hover:text-gray-200 focus:bg-red-500 focus:hover:bg-red-600 dark:text-gray-200">Salir</DropdownItem>
              </Dropdown> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function UserDropdown({ userData }: { userData: IUserSession | null }) {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Popover
        trigger="click"
        aria-labelledby="profile-popover"
        content={
          <div className="w-64">
            <div className="mb-2 flex items-center px-3 pt-3 justify-between">
              <a>
                <img
                  className="h-10 w-10 rounded-full"
                  src="/favicon.ico"
                  alt="USER_IMAGE"
                />
              </a>
              <div>
                <button
                  type="button"
                  className="rounded-lg bg-gray-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Ver compañias
                </button>
              </div>
            </div>
            <div className="px-3">
              <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a>{userData?.fullname}</a>
              </p>
              <p className="mb-2 text-sm font-normal">
                <a className="hover:underline dark:text-gray-500">
                  {userData?.email}
                </a>
              </p>
              <p className=" text-sm">
                <a className="font-semibold text-gray-600 dark:text-gray-400">
                  {RoleObject.admin === userData?.role ? "Administrador" : RoleObject.partner === userData?.role ? "Socio" : "Usuario"}
                </a>
                {" "} <span className=" text-gray-800 dark:text-gray-300">en</span> <span className="font-bold text-red-600 dark:text-red-600">Mi</span><span className="font-bold text-gray-800 dark:text-gray-300">Precio.</span>
              </p>
            </div>
            <ul className="divide-y divide-gray-100 rounded-lg dark:divide-gray-600  py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
              <li>
                <Link to="/home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Inicio</Link>
              </li>
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Perfil</Link>
              </li>
              <li>
                <a href="/profile?password=true" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cambiar contraseña</a>
              </li>
              {/* <div className="divide-y divide-gray-700 dark:divide-gray-200">
                <Link to="/" onClick={
                  async () => {
                    setLoading(true);
                    if (!loading) await fetch("/auth/logout", { method: "POST" });
                  }
                }
                  className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:text-gray-200 dark:hover:text-gray-200 hover:bg-red-500 dark:hover:bg-red-600 dark:text-gray-200 ">{loading ? "Saliendo..." : "Salir"} {loading && <Spinner size="sm" color="success" aria-label="Success spinner example" />}</Link>
              </div> */}
              {loading ? (
                <div className="divide-y divide-gray-700 dark:divide-gray-200">
                  <Link to="/"
                    className="flex justify-between px-4 py-2 text-sm text-gray-500 hover:text-gray-200 dark:hover:text-gray-200 hover:bg-red-500 dark:hover:bg-red-600 dark:text-gray-400 ">Saliendo... <Spinner size="sm" color="success" aria-label="Success spinner example" /></Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-700 dark:divide-gray-200">
                  <Link to="/" onClick={
                    async () => {
                      setLoading(true);
                      if (!loading) await fetch("/auth/logout", { method: "POST" });
                    }
                  }
                    className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:text-gray-200 dark:hover:text-gray-200 hover:bg-red-500 dark:hover:bg-red-600 dark:text-gray-200 ">Salir</Link>
                </div>
              )}
            </ul>

          </div>
        }
      >
        <button id="dropdownAvatarNameButton" className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-gray-500 dark:hover:text-gray-400 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
          <span className="sr-only">Abrir menu de usuario</span>
          <img className="w-8 h-8 me-2 rounded-full" src="/favicon.ico" alt="user photo" />
          {userData?.fullname ?? ""}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
      </Popover>      
    </div>
  );
}