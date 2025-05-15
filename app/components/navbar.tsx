import { useState, type FC } from "react";
import { Button, DarkThemeToggle, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Label, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, ToggleSwitch, useThemeMode, type ThemeMode } from "flowbite-react";
import { Link, useNavigate, useLocation } from "react-router";
import Paths, { type Path } from "~/paths";
import { HiCog, HiCurrencyDollar, HiDocumentDownload, HiLogout, HiViewGrid } from "react-icons/hi";
import AddUserModal from "../user/addUserModal";
import AddCategoryModel from "~/category/addCategoryModel";
import AddProductModal from "~/product/addProductModal";
import AddCompanyModal from "~/company/addCompanyModal";
const NavBar: FC = function () {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toggleMode, computedMode } = useThemeMode();
  const lightMode: ThemeMode = "light";
  return (
    <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <div className="mb-1 w-full">
        <div className="sm:flex">
          <div className="mb-3 hidden items-center pt-1 dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
            <span className="self-center text-2xl text-center font-bold dark:text-white pr-4">
              {pathname.toUpperCase().replace("/", "") === "HOME" && "Inicio"}
              {pathname.toUpperCase().replace("/", "") === "USERS" && "Usuarios"}
              {pathname.toUpperCase().replace("/", "") === "STORE" && "Tienda"}
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
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
              alt="user photo"
            /> <p className="text-sm truncate max-w-32">Martin C</p>
              </div>} className="text-white pb-2 pt-2 rounded-md pl-4 pr-4 dark:bg-zinc-100 dark:text-black dark:focus:text-black dark:focus:bg-zinc-50 dark:hover:bg-neutral-50" color="gray" >
                <DropdownHeader className="dark:text-black">
                  <span className="block text-sm">Usuario</span>
                  <span className="block truncate text-sm font-medium">martin@gmail.com</span>
                </DropdownHeader>
                <DropdownItem className="focus:rounded-md dark:text-black" icon={HiViewGrid}>Inicio</DropdownItem>
                <DropdownItem className="focus:rounded-md dark:text-black" icon={HiCog}>Mi Perfil</DropdownItem>
                <DropdownItem className="focus:rounded-md dark:text-black" icon={HiCurrencyDollar}>Cambiar contraseña</DropdownItem>
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

{/* <Navbar fluid className="sticky bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700  left-0 right-0 top-0 z-50">
      <div className="w-full lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavbarBrand onClick={() => { navigate("/home") }}>
              <img alt="" src="/public/favicon.ico" className="mr-3 h-6 sm:h-8" />
              <span className="self-center cursor-pointer whitespace-nowrap text-2xl font-semibold dark:text-white">
                MiPrecio
              </span>
            </NavbarBrand>
          </div>
          <div className="flex items-center gap-3">
            <NavbarToggle />
            <NavbarCollapse className="md:hidden">
              {Paths.map((path:Path) => (
                <NavbarLink key={path.name} className={path.style} onClick={() => { navigate(path.pathname) }} active={path.pathname === pathname}>
                {path.name}
              </NavbarLink>
              ))}<NavbarLink onClick={() => { navigate("/auth/signin") }} className="cursor-pointer hover:bg-red-700 hover:text-gray-200 text-gray-600 dark:text-gray-400 dark:hover:bg-red-700"> Salir </NavbarLink>
            </NavbarCollapse>
            <DarkThemeToggle color="dark" />
          </div>
        </div>
      </div>
    </Navbar> */}