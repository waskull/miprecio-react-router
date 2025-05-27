import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiLogin,
  HiOutlineLogout,
  HiPencil,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { TbBrandDatabricks } from "react-icons/tb";
import { MdOutlineWarehouse } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";

const Appsidebar: FC = function () {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [currentPage, setCurrentPage] = useState(pathname);

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  return (
    <Sidebar className="fixed collapse md:visible border-b text-gray-950 border-r-1 border-gray-200 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar with multi-level dropdown example">
      <div className="px-3 border-b border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <Link to="/home" className="flex items-center ps-0 mb-2">
          <img src="/favicon.ico" className="h-6 me-2 sm:h-7" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MiPrecio</span>
        </Link>
      </div>
      <div className="flex  flex-col justify-between py-2">
        <SidebarItems>

          <SidebarItemGroup>
            <SidebarItem
              onClick={() => navigate("/home")}
              icon={HiChartPie}
              className={
                "/home" === currentPage ? "bg-gray-100 dark:bg-gray-700 cursor-pointer" : "cursor-pointer"
              }
            >
              Inicio
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate("/users")}
              icon={HiUsers}
              className={
                "/users" === currentPage
                  ? "bg-gray-100 dark:bg-gray-700 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              Usuarios
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate("/products")}
              icon={HiShoppingBag}
              className={
                "/products" === currentPage
                  ? "bg-gray-100 dark:bg-gray-700 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              Productos
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate("/categories")}
              icon={HiShoppingBag}
              className={
                "/categories" === currentPage
                  ? "bg-gray-100 dark:bg-gray-700 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              Categorias
            </SidebarItem>
            {/* <SidebarItem className="cursor-pointer" onClick={() => navigate("/auth/signin")} icon={HiLogin}>
              Iniciar sesión
            </SidebarItem>
            <SidebarItem className="cursor-pointer" onClick={() => navigate("/auth/signup")} icon={HiPencil}>
              Crear Cuenta
            </SidebarItem> */}
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem
              onClick={() => navigate("/companies")}
              icon={TbBrandDatabricks}
              className="cursor-pointer"
            >
              Compañias
            </SidebarItem>
            <SidebarItem
              className="cursor-pointer"
              onClick={() => navigate("/store")}
              icon={MdOutlineWarehouse}
            >
              Almacenes
            </SidebarItem>
          </SidebarItemGroup>
          <SidebarItemGroup className="justify-content-end flex-grow-1 pe-3 mb-1 bottom-0 lg:fixed md:relative">

            <SidebarItem
              color="white"
              className="text-black hover:text-gray-200 dark:text-white  w-58  hover:bg-red-700 focus:bg-red-700 dark:focus:bg-red-800 dark:hover:bg-red-700 cursor-pointer"
              onClick={() => navigate("/")}
              icon={HiOutlineLogout}
            >
              Salir
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </div>
    </Sidebar>
  );
};

export default Appsidebar;