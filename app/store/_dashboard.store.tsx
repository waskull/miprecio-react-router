import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { Route } from "../store/+types/_dashboard.store";
import { useEffect, useState } from "react";
import NavBar from "~/components/navbar";
import StoreList from "./StoreList";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/store/");
        const json = await data.json();
        return json;
    }catch(e){
        return [];
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
            <NavBar />
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden shadow ">
                            <StoreList data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-x-auto justify-center sticky w-full items-center border-t border-gray-200 bg-white pt-2 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-4">
                <Pagination currentPage={currentPage} totalPages={data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
}
