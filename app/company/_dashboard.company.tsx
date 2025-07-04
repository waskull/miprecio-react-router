import { Pagination } from "flowbite-react";
import type { Route } from "../company/+types/_dashboard.company";
import { useEffect, useState } from "react";
import CompanyList from "./companyList";
import { useLoaderData, type MetaFunction } from "react-router";
import type { ICompany } from "./company";
import { getSession } from "~/sessions.server";
import type { TaddCompanySchema } from "./companySchema";
import { addCompany } from "./companyService";
import apiURL from "~/apiURL";

export const meta: MetaFunction = () => {
  return [
    { title: "Compañias" },
    { name: "description", content: "MiPrecio" },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch(`${apiURL}/company/`);
        const json = await data.json() as ICompany[];
        return { data: json || [] };
    } catch (e) {
        return [];
    }
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    console.log(formData);
    try {
        const data = Object.fromEntries(formData) as TaddCompanySchema;
        const result = await addCompany(data, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al agregar la categoria", errors: result }
        if (result.error_code) { return { error: true, message: result?.message, error_code: result?.error_code } };
        return { message: "Categoria ha sido creada con exito", data: result };
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}

export default function CompanyPage({ }: Route.ComponentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const data = useLoaderData() as { data: ICompany[] };
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 shadow ">
                            <CompanyList data={data.data} />
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
