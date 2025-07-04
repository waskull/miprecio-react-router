import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Dropdown, DropdownItem, DropdownDivider, useThemeMode, Button, DropdownHeader, ToggleSwitch, type ThemeMode } from "flowbite-react";
import type { Route } from "../dashboard/+types/_dashboard.dashboard";
import { useEffect, useState, type FC, type JSX } from "react";
import type { ICompanyStore, IStore } from "~/store/store";
import { data, Link, useLoaderData, type MetaFunction } from "react-router";
import type { IProduct } from "~/product/product";
import type { IUser } from "~/user/user";
import { RoleObject } from "~/util/role-enum";
import apiURL from "~/apiURL";

export const meta: MetaFunction = () => {
  return [
    { title: "Inicio" },
    { name: "description", content: "MiPrecio" },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const store = await fetch(`${apiURL}/store/top`);
    const products = await fetch(`${apiURL}/product/top`);
    const users = await fetch(`${apiURL}/user/top`);
    return { store: await store.json() || [], products: await products.json() || [], users: await users.json() || [] };
  } catch (e) {
    return [];
  }
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const data = useLoaderData() as { store: ICompanyStore[], products: IProduct[], users: IUser[] };
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden min-h-screen max-w-screen bg-gray-50 dark:bg-gray-900 shadow pr-6 pl-6">
              <div className="pt-6">
                <PopularProducts store={data?.store} />
              </div>
              <div className="py-6">
                <LatestTransactions products={data?.products} />
              </div>
              <LatestCustomers users={data?.users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* const ApexChart = lazy(async () => {
  const module = await import("react-apexcharts");
  return { default: module.default };
}); */

export function Chart(props: any) {
  const [Chart, setChart] = useState<any>();
  const hasType = typeof props?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
}

export function Dash({ data }: { data: IStore[] }) {
  useEffect(() => {
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 m-2">
      <h1 className="text-black dark:text-white text-3xl mb-4 text-center flex">Ultimos productos registrados</h1>
      <div className="overflow-x-auto">
        <h3 className="text-black dark:text-white text-2xl"> </h3>
        {data?.length > 0 ? (
          <Table className="backdrop-blur-lg">
            <TableHead>
              <TableRow>
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Tienda</TableHeadCell>
                <TableHeadCell>Categoria</TableHeadCell>
                <TableHeadCell>Precio</TableHeadCell>
                {/* <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell> */}
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((e: any) => (
                <TableRow key={e.uid} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {e?.product?.name}
                  </TableCell>
                  <TableCell>?</TableCell>
                  <TableCell>{e?.product?.category?.name}</TableCell>
                  <TableCell>{e?.price}</TableCell>
                  {/* <TableCell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-2">
                                    Editar
                                </a>
                                <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                                    Eliminar
                                </a>
                            </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h2 className="text-black dark:text-white">No hay registros :S</h2>
        )}
      </div>
    </div>
  )
}

export function PopularProducts({ store }: { store: ICompanyStore[] }): JSX.Element {
  return (
    <div>
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <div className="mb-2 flex items-center justify-between">
          <div className="shrink-0">
            <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
              Tiendas mas populares<span className="text-2xl font-bold text-gray-700 dark:text-gray-300">.</span>
            </span>
            <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
              Estas son las {store?.length} tiendas mas TOP
            </h3>
          </div>
          <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
            {/* 12.5% 
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            */}
          </div>
        </div>
        <SalesChart store={store} />
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
          {/* <Datepicker /> */}
          <div></div>
          <div className="shrink-0">
            <Link
              to="/store"
              className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 dark:text-zinc-100 hover:bg-gray-100 dark:hover:bg-gray-700 sm:text-sm"
            >
              Ver Tiendas
              <svg
                className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export function SalesChart({ store }: { store: ICompanyStore[] }) {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;

  const options = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fillSeriesColor: false,
      theme: "mixed",
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        color: isDarkTheme ? "#FFFFFF" : "#000000",
      },
      marker: {
        show: true
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName: any) => seriesName,
        },
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: isDarkTheme ? "#FFFFFF" : "#FFFFFF",
      strokeWidth: 2,
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      categories: store.map((st) => st?.name),
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: isDarkTheme ? "#FFFFFF" : "#000000",
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        background: {
          enabled: false,
          foreColor: '#fff',
        },
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value: any) {
          return value + "  consultas";
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Cantidad:",
      data: store.map((st, index) => st.store.filter((product: IStore) => !product?.is_deleted).length),
      color: isDarkTheme ? "#31C48D" : "#057A55",
    },
  ];

  return <Chart height={420} options={options} series={series} type="area" />

};

const Datepicker: FC = function () {
  return (
    <span className="text-sm text-gray-300">
      <Dropdown inline label="Ultimos 7 dias">
        <DropdownItem>
          <strong>Junio 16, 2025 - Junio 22, 2025</strong>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem>Ayer</DropdownItem>
        <DropdownItem>Hoy</DropdownItem>
        <DropdownItem>Ultimos 7 dias</DropdownItem>
        <DropdownItem>Ultimos 30 dias</DropdownItem>
        <DropdownDivider />
      </Dropdown>
    </span>
  );
};

export function LatestCustomers({ users }: { users: IUser[] }): JSX.Element {
  return (
    <div className="mb-4 h-full max-w-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl capitalize font-bold leading-none text-zinc-900 dark:text-white">
          Ultimos clientes
        </h3>
        {/* <Link
          to={"/users"}
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700"
        >
          Ver todos
        </Link> */}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user: IUser) => (
            <li key={user.uid} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/favicon.ico"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {user.fullname}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {user.role === RoleObject.admin ? "Administrador" : user.role === RoleObject.partner ? "Socio" : "Usuario"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        {/* <Datepicker /> */}
        <div></div>
        <div className="shrink-0">
          <Link
            to="/users"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700 sm:text-sm"
          >
            VER USUARIOS
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const AcquisitionOverview: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
        Acquisition Overview
      </h3>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table className="min-w-full table-fixed">
                <TableHead>
                  <TableHeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Top Channels
                  </TableHeadCell>
                  <TableHeadCell className="whitespace-nowrap border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Users
                  </TableHeadCell>
                  <TableHeadCell className="min-w-[140px] whitespace-nowrap rounded-r border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Acquisition
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <TableRow className="text-gray-500 dark:text-gray-400">
                    <TableCell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Organic Search
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      5,649
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">30%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-zinc-700"
                              style={{ width: "30%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-gray-500 dark:text-gray-400">
                    <TableCell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Referral
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      4,025
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">24%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-orange-300"
                              style={{ width: "24%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-gray-500 dark:text-gray-400">
                    <TableCell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Direct
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      3,105
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">18%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-teal-400"
                              style={{ width: "18%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-gray-500 dark:text-gray-400">
                    <TableCell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Social
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      1251
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">12%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-pink-600"
                              style={{ width: "12%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-gray-500 dark:text-gray-400">
                    <TableCell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Other
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      734
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">9%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-indigo-600"
                              style={{ width: "9%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-gray-500 dark:text-gray-400">
                    <TableCell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Email
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      456
                    </TableCell>
                    <TableCell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">7%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-purple-500"
                              style={{ width: "7%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700 sm:text-sm"
          >
            Acquisition Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const LatestTransactions = function ({ products }: { products: IProduct[] }) {
  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 capitalize text-xl font-bold text-gray-900 dark:text-white">
            Nuevos productos
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            Ultimos 5 productos registrados
          </span>
        </div>
        <div className="shrink-0">
          {/* <Link
            to="/products"
            className="rounded-lg p-2 text-sm font-medium text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700"
          >
            Ver todos
          </Link> */}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">


              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Producto
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Categoria
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.uid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.name}
                        </th>
                        <td className="px-6 py-4">
                          {product.description}
                        </td>
                        <td className="px-6 py-4">
                          {product.category.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        {/* Datepicker /> */}
        <div></div>
        <div className="shrink-0">
          <Link
            to="/products"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700 sm:text-sm"
          >
            Ver Productos
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};