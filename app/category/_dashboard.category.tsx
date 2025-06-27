import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import type { Route } from "./+types/_dashboard.category";
import { useLoaderData, type MetaFunction } from "react-router";
import type { ICategory } from "./category";
import { getSession } from "~/sessions.server";
import type { TaddCategorySchema } from "./categorySchema";
import { addCategory } from "./categoryService";

export const meta: MetaFunction = () => {
  return [
    { title: "Categorias" },
    { name: "description", content: "MiPrecio" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/category/");
        const json = await data.json();
        return { data: json || [] };
    }catch(e){
        return [];
    }
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    console.log(formData);
    try {
        const data = Object.fromEntries(formData) as TaddCategorySchema;
        const result = await addCategory(data, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al agregar la categoria", errors: result }
        return "Categoria ha sido creada con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}

export default function CategoryPage({}: Route.ComponentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const data = useLoaderData() as { data: ICategory[] };
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 shadow ">
                            <CategoryList data={data?.data} />
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
