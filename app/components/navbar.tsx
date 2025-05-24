import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Label, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, ToggleSwitch, useThemeMode, type ThemeMode } from "flowbite-react";
import { Link, useLocation } from "react-router";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import AddUserModal from "../user/addUserModal";
import AddCategoryModel from "~/category/addCategoryModel";
import AddProductModal from "~/product/addProductModal";
import AddCompanyModal from "~/company/addCompanyModal";
import type { IUserSession } from "~/interfaces/user";
import { RoleObject } from "~/util/role-enum";
import { Suspense, useEffect, useState } from "react";
export default function NavBar() {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  useEffect(() => {
    const getData = async () => {
      let data = await fetch("/users/getuserinfo/");
      setUserData(await data.json());
    }
    getData();
  }, []);
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
            {pathname === "/companies" && <AddCompanyModal />}
            <div className="flex items-center gap-x-3">
              <ToggleSwitch label={computedMode === lightMode ? "🌜" : "🌞"} checked={computedMode === lightMode ? true : false} onChange={() => toggleMode()}></ToggleSwitch>


              <Suspense fallback={<div>Cargando...</div>}>
                <UserDropdown userData={userData} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function UserDropdown({ userData }: { userData: IUserSession | null }) {
  return (
    <div>
      <button id="dropdownAvatarNameButton" data-dropdown-toggle="userDropdown" className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-gray-400 dark:hover:text-gray-400 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
        <span className="sr-only">Abrir menu de usuario</span>
        <img className="w-8 h-8 me-2 rounded-full" src="/favicon.ico" alt="user photo" />
        {userData?.fullname ?? ""}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>


      <div id="userDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div className="font-medium ">{RoleObject.admin === userData?.role ? "Administrador" : RoleObject.partner === userData?.role ? "Socio" : "Usuario"}</div>
          <div className="truncate">{userData?.email || ""}</div>
        </div>

        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
          <li>
            <Link to="/home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Inicio</Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Perfil</Link>
          </li>
          <li>
            <Link to="/changepassword" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cambiar contraseña</Link>
          </li>
        </ul>
        <div className="py-2">
          <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Salir</Link>
        </div>
      </div>
    </div>
  );
}