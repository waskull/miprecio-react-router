import { Breadcrumb, BreadcrumbItem, Pagination } from "flowbite-react";
import type { Route } from "../store/+types/_dashboard.store";
import { useEffect, useState } from "react";
import NavBar from "~/components/navbar";
import StoreList from "./StoreList";
import { HiHome } from "react-icons/hi";
import StoreDetail from "./storeDetail";
import { addProductStoreSchema } from "./storeSchema";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/store/company/" + params.id + "");
        const json = await data.json();
        return json;
    } catch (e) {
        return [];
    }
}

export async function action({ params, request }: Route.ActionArgs) {
    const formData = await request.formData() as FormData;
    const productData = {
        product_uid: formData.get("product_uid") as string,
        discount: parseInt(formData.get("discount") as string),
        price: parseFloat(formData.get("price") as string),
        wholesale_price: parseFloat(formData.get("wholesale_price") as string),
    }
    try {
        const form = await addProductStoreSchema.safeParseAsync(productData);
        console.log("form", form.data);
        return {}
    } catch (e) {
        console.log(e);
        return { message: "Algo malio sal", error: e }
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
