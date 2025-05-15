import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, Dropdown, DropdownItem, DropdownDivider, useThemeMode, Button, DropdownHeader, ToggleSwitch, type ThemeMode } from "flowbite-react";
import type { FC } from "react";
import type { Route } from "../dashboard/+types/_dashboard.dashboard";
import { lazy, Suspense } from "react";

import { useEffect, useState } from "react";
import type { IStore } from "~/store/store";
import { HiViewGrid, HiCog, HiCurrencyDollar, HiLogout } from "react-icons/hi";
import { Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const data = await fetch("http://localhost:8000/api/v1/store/stores");
    const json = await data.json();
    return json;
  } catch (e) {
    return [];
  }
}

const ApexChart = lazy(async () => {
  const module = await import("react-apexcharts");
  return { default: module.default };
});

export function Dashboard({
  loaderData,
}: Route.ComponentProps) {
  const [data, setData] = useState<IStore[]>(loaderData);
  useEffect(() => {
    console.log(loaderData);
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 m-2">
      <h1 className="text-black dark:text-white text-3xl mb-4 text-center flex">Ultimos productos registrados</h1>
      <div className="overflow-x-auto">
        <h3 className="text-black dark:text-white text-2xl"> </h3>
        {data.length > 0 ? (
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
              {data.map((e: any) => (
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
export default function DashboardPage() {
  const { toggleMode, computedMode } = useThemeMode();
  const lightMode: ThemeMode = "light";
  return (
    <div>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="sm:flex">
            <div className="mb-3 hidden items-center pt-1 dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
            <span className="self-center text-2xl text-center font-bold dark:text-white">Inicio</span>
        
            
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">


              <div className="flex items-center gap-x-3">
                <ToggleSwitch label={computedMode === lightMode ? "🌜" : "🌞"} checked={computedMode === lightMode ? true : false} onChange={() => toggleMode()}></ToggleSwitch>
                <Dropdown label="Martin C" className="text-white pb-2 pt-2 rounded-md pl-4 pr-4 dark:bg-zinc-100 dark:text-black dark:focus:text-black dark:focus:bg-zinc-50 dark:hover:bg-neutral-50" color="gray" >
                  <DropdownHeader className="dark:text-black">
                    <span className="block text-sm">Usuario</span>
                    <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
                  </DropdownHeader>
                  <DropdownItem className="focus:rounded-md dark:text-black" icon={HiViewGrid}>Dashboard</DropdownItem>
                  <DropdownItem className="focus:rounded-md dark:text-black" icon={HiCog}>Settings</DropdownItem>
                  <DropdownItem className="focus:rounded-md dark:text-black" icon={HiCurrencyDollar}>Earnings</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem className="focus:rounded-md focus:text-white focus:bg-red-600 dark:focus:bg-red-600 dark:text-black" icon={HiLogout}>Sign out</DropdownItem>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6">
        <PopularProducts />
        <div className="my-6">
          <LatestTransactions />
        </div>
        <LatestCustomers />
        {/* <div className="my-6">
                <AcquisitionOverview />
            </div> */}
      </div>
    </div>
  );
}

const PopularProducts: FC = function () {
  return (
    <div>

      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="shrink-0">
            <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
              2341 <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">productos consultados</span>
            </span>
            <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
              Productos mas consultados
            </h3>
          </div>
          <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
            12.5%
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
          </div>
        </div>
        <SalesChart />
        <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
          <Datepicker />
          <div className="shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 dark:text-zinc-100 hover:bg-gray-100 dark:hover:bg-gray-700 sm:text-sm"
            >
              Ver productos
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

const SalesChart: FC = function () {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;

  const options: ApexCharts.ApexOptions = {
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
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
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
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
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
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return "$" + value;
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
      name: "Revenue",
      data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
      color: "#1A56DB",
    },
  ];

  return <Suspense> <ApexChart height={420} options={options} series={series} type="area" /> </Suspense>

};

const Datepicker: FC = function () {
  return (
    <span className="text-sm text-gray-600">
      <Dropdown inline label="Last 7 days">
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

const LatestCustomers: FC = function () {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-zinc-900 dark:text-white">
          Ultimos clientes
        </h3>
        <a
          href="#"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700"
        >
          Ver todos
        </a>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
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
                  Neil Sims
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
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
                  Bonnie Green
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $3467
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
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
                  Michael Gough
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $67
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
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
                  Thomes Lean
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $2367
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
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
                  Lana Byrd
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $367
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700 sm:text-sm"
          >
            Reporte de productos
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

const LatestTransactions: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Ultimas transacciones
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            Lista de transacciones recientes
          </span>
        </div>
        <div className="shrink-0">
          <a
            href="#"
            className="rounded-lg p-2 text-sm font-medium text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700"
          >
            View all
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <TableHead className="bg-gray-50 dark:bg-gray-700">
                  <TableHeadCell>Transaction</TableHeadCell>
                  <TableHeadCell>Date &amp; Time</TableHeadCell>
                  <TableHeadCell>Amount</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </TableHead>
                <TableBody className="bg-white dark:bg-gray-800">
                  <TableRow>
                    <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Bonnie Green</span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 23, 2021
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $2300
                    </TableCell>
                    <TableCell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-zinc-800 hover:bg-gray-100 dark:text-zinc-100 dark:hover:bg-gray-700 sm:text-sm"
          >
            Transactions Report
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