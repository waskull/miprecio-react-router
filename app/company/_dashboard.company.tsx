import { Pagination } from "flowbite-react";
import type { Route } from "../company/+types/_dashboard.company";
import { useEffect, useState } from "react";
import NavBar from "~/components/navbar";
import CompanyList from "./companyList";
import { useLoaderData } from "react-router";
import type { ICompany } from "./company";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/company/");
        const json = await data.json() as ICompany[];

        return { data: json || [] }
    } catch (e) {
        return [];
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
