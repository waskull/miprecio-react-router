import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { Route } from "./+types/_dashboard.product";
import { useEffect, useState, type JSX } from "react";
import NavBar from "~/components/navbar";
import type { IProduct } from "~/interfaces/product";
import DeleteModal from "~/components/DeleteModal";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/product/");
        const json = await data.json();
        return json;
    } catch (e) {
        return [];
    }
}

export default function Dashboard({
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
                            <ProductList data={data} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Pagination data={data.length | 0} /> */}
            <div className="flex flex-col overflow-x-auto justify-center sticky w-full items-center border-t border-gray-200 bg-white pt-2 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-4">
                <Pagination currentPage={currentPage} totalPages={data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
}

function ProductList({ data }: { data: IProduct[] }): JSX.Element {
    return (
        <Table className="min-w-full divide-y mt-0 divide-gray-200 dark:divide-gray-600">
            <TableHead className="bg-gray-100 dark:bg-gray-700">
                {/* <TableHeadCell>
                    <Label htmlFor="select-all" className="sr-only">
                        Select all
                    </Label>
                    <Checkbox id="select-all" name="select-all" />
                </TableHeadCell> */}
                <TableHeadCell>Nombre</TableHeadCell>
                {/* <TableHeadCell>Correo</TableHeadCell> */}
                <TableHeadCell>Descripción</TableHeadCell>
                <TableHeadCell>Categoria</TableHeadCell>
                <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">

                {data.map((u: IProduct) => (
                    <TableRow key={u.uid} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        {/* <TableCell className="w-4 p-4">
                            <div className="flex items-center">
                                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                                <label htmlFor="checkbox-1" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </TableCell> */}
                        <TableCell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="/favicon.ico"
                                alt="Neil Sims avatar"
                            />
                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                    {u.name}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                            {u.description}
                        </TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                            {u?.category?.name}
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-x-2 whitespace-nowrap">
                                {/* <EditUserModal /> */}
                                <DeleteModal title="Eliminar product" desc="¿Estas seguro de que desas borrar este producto?" deleteFunc={async () => console.log("Borrando producto")} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    );
};