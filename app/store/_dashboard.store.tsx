import { Breadcrumb, BreadcrumbItem, Pagination } from "flowbite-react";
import type { Route } from "../store/+types/_dashboard.store";
import { useEffect, useState } from "react";
import StoreList from "./StoreList";
import { HiHome } from "react-icons/hi";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/store/");
        const json = await data.json();
        return json;
    } catch (e) {
        return [];
    }
}

export async function action({ params }: Route.ActionArgs) {
    try {
        console.log(params);
    } catch (e) {
        console.log(e);
    }
}

export default function StorePage({
    loaderData,
}: Route.ComponentProps) {
    const [data, setData] = useState<[]>(loaderData);
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    useEffect(() => {
        console.log(loaderData);
    }, []);
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 shadow ">
                            <Breadcrumb className="p-4" aria-label="Default breadcrumb example">
                                <BreadcrumbItem href="/home" icon={HiHome}>
                                    Inicio
                                </BreadcrumbItem>
                                <BreadcrumbItem href="/store">Tienda</BreadcrumbItem>
                            </Breadcrumb>
                            <StoreList data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-x-auto justify-center fixed bottom-0 w-full items-center border border-gray-200 bg-white  dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-3.5">
                <Pagination nextLabel="Siguiente" previousLabel="Anterior" currentPage={currentPage} totalPages={data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
}
