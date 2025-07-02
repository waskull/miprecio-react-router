import { Pagination } from "flowbite-react";
import type { Route } from "../product/+types/_dashboard.product";
import { useEffect, useState, type JSX } from "react";
import ProductList from "./productList";
import type { IProduct } from "./product";
import { useLoaderData, type MetaFunction } from "react-router";
import { getSession } from "~/sessions.server";
import type { TaddProductSchema } from "./productSchema";
import { addProduct } from "./productService";
import apiURL from "~/apiURL";

export const meta: MetaFunction = () => {
  return [
    { title: "Productos" },
    { name: "description", content: "MiPrecio" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const data = await fetch(`${apiURL}/product/`);
        const json = await data.json();

        return { data: json || [] }
    } catch (e) {
        return [];
    }
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    console.log(formData);
    try {
        const data = Object.fromEntries(formData) as TaddProductSchema;
        const result = await addProduct(data, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al agregar el producto", errors: result }
        return "El producto ha sido creado con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}

export default function ProductPage({ }: Route.ComponentProps) {
    const data = useLoaderData() as { data: IProduct[] };
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    useEffect(() => {
    }, []);
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900  shadow ">
                            <ProductList data={data.data} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-x-auto justify-center fixed bottom-0 w-full items-center border border-gray-200 bg-white  dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-3.5">
                <Pagination nextLabel="Siguiente" previousLabel="Anterior" currentPage={currentPage} totalPages={data.data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
}
