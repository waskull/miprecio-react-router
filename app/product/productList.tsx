import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import type { JSX } from "react";
import DeleteModal from "~/components/DeleteModal";
import type { IProduct } from "~/product/product";

export default function ProductList({ data }: { data: IProduct[] }): JSX.Element {
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