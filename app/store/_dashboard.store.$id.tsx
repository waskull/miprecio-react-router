import { Breadcrumb, BreadcrumbItem, Pagination } from "flowbite-react";
import type { Route } from "../store/+types/_dashboard.store";
import { useEffect, useState } from "react";
import NavBar from "~/components/navbar";
import StoreList from "./StoreList";
import { HiHome } from "react-icons/hi";
import StoreDetail from "./storeDetail";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/store/company/"+params.id+"");
        const json = await data.json();
        return json;
    } catch (e) {
        return [];
    }
}

export default function StorePage({
    loaderData,
}: Route.ComponentProps) {
    const [data, setData] = useState(loaderData);
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
                                <BreadcrumbItem>{data?.name || "Tienda no encontrada"}</BreadcrumbItem>
                            </Breadcrumb>
                            <StoreDetail data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
