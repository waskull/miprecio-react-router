import { Pagination } from "flowbite-react";
import type { Route } from "../product/+types/_dashboard.product";
import { useEffect, useState, type JSX } from "react";
import ProductList from "./productList";
import type { IProduct } from "./product";
import { useLoaderData } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/product/");
        const json = await data.json();
        
        return { data: json || [] }
    } catch (e) {
        return [];
    }
}

export default function ProductPage({}: Route.ComponentProps) {
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
                        <div className="overflow-hidden shadow ">
                            <ProductList data={data.data} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Pagination data={data.length | 0} /> */}
            <div className="flex flex-col overflow-x-auto justify-center sticky w-full items-center border-t border-gray-200 bg-white pt-2 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-4">
                <Pagination nextLabel="Siguiente" previousLabel="Anterior" currentPage={currentPage} totalPages={data.data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
}
