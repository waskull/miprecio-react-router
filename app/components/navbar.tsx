import { type FC } from "react";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Label, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, ToggleSwitch, useThemeMode, type ThemeMode } from "flowbite-react";
import { useNavigate, useLocation } from "react-router";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import AddUserModal from "../user/addUserModal";
import AddCategoryModel from "~/category/addCategoryModel";
import AddProductModal from "~/product/addProductModal";
import AddCompanyModal from "~/company/addCompanyModal";
const NavBar: FC = function () {
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
             
              <Dropdown label={ <div className="flex items-center gap-x-2 ">
                <img
              className="w-8 h-8 rounded-full"
              src="/favicon.ico"
              alt="user photo"
            /> <p className="text-sm truncate max-w-32">Martin C</p>
              </div>} className="pb-2 pt-2 rounded-md pl-4 pr-4 dark:bg-transparent  dark:focus:text-black dark:focus:bg-gray-50 dark:hover:outline-gray-100 dark:text-gray-100 ring-2 dark:hover:bg-gray-100 bg-gray-50 text-gray-900 dark:hover:text-black dark:focus:ring-gray-400 dark:hover:ring-gray-400  hover:bg-gray-100  focus:bg-gray-100 focus:ring-gray-700 focus:outline-none focus:ring-2 ring-gray-700" >
                <DropdownHeader className="dark:text-black">
                  <span className="block text-sm">Usuario</span>
                  <span className="block truncate text-sm font-medium">martin@gmail.com</span>
                </DropdownHeader>
                <DropdownItem className="focus:rounded-md dark:text-black focus:bg-gray-300 text-gray-900" icon={HiViewGrid}>Inicio</DropdownItem>
                <DropdownItem className="focus:rounded-md dark:text-black focus:bg-gray-300 text-gray-900" icon={HiCog}>Mi Perfil</DropdownItem>
                <DropdownItem className="focus:rounded-md dark:text-black focus:bg-gray-300 text-gray-900" icon={HiCurrencyDollar}>Cambiar contraseña</DropdownItem>
                <DropdownDivider />
                <DropdownItem className="focus:rounded-md focus:text-white focus:bg-red-600 dark:focus:bg-red-600 dark:text-black" icon={HiLogout}>Salir</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;