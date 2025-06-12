import type { JSX } from "react";
import { useNavigate } from "react-router";
import DeleteModal from "~/components/DeleteModal";
import type { IProduct } from "~/product/product";
import EditProductModal from "./editProductModal";

export default function ProductList({ data }: { data: IProduct[] }): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <table className="w-full min-w-full divide-y mt-0 dark:divide-gray-600 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((u: IProduct) => (
                        <tr key={u.uid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0 px-6 py-4 font-medium text-gray-900 dark:text-white">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="/favicon.ico"
                                    alt="Neil Sims avatar"
                                />
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    <div className="text-base truncate font-semibold text-gray-900 dark:text-white">
                                        {u.name}
                                    </div>
                                </div>
                            </th>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                {u.description}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                {u?.category?.name}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                <div className="flex justify-end gap-x-2">
                                    <EditProductModal uid={u.uid} />
                                    <DeleteModal title="Eliminar producto" desc="¿Estas seguro de que desas borrar este producto?" deleteFunc={async () => {
                                        await fetch(`products/delete/${u.uid}`, { method: "POST" });
                                        navigate('.', { replace: true });
                                    }} /> </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
};