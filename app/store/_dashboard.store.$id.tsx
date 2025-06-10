import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import StoreDetail from "./storeDetail";
import { addStoreProduct } from "./storeService";
import type { TaddProductStoreSchema } from "./storeSchema";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_dashboard.store.$id";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/store/company/" + params.id + "/");
        const json = await data.json();
        return json;
    } catch (e) {
        return [];
    }
}

export async function action({ params, request }: any) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    const productData = {
        product_uid: formData.get("product_uid") as string,
        discount: parseInt(formData.get("discount") as string),
        price: parseFloat(formData.get("price") as string),
        wholesale_price: parseFloat(formData.get("wholesale_price") as string),
        company_uid : params.id as string
    }
    try {
        const data = Object.fromEntries(formData) as TaddProductStoreSchema;
        const res = await addStoreProduct(productData, session.get("access_token") ?? "");
        console.log("res", res);
        return { message: "Producto agregado con exito", success: true };
    } catch (e) {
        console.log(e);
        return { message: "Algo malio sal", error: true, errors: e };
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
