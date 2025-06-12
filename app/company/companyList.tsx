import type { JSX } from "react";
import DeleteModal from "~/components/DeleteModal";
import type { ICompany } from "./company";
import { useNavigate } from "react-router";
import EditCompanyModal from "./editCompanyModal";

export default function CategoryList({ data }: { data: ICompany[] }): JSX.Element {
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
                            Dueño
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Registrado por
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((u: ICompany) => (
                        <tr key={u.uid} className=" dark:bg-gray-800 dark:border-gray-700 border-gray-200">
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
                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {u.description}
                                    </div>
                                </div>
                            </th>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                {u.partner.fullname}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                {u.user.fullname}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                <div className="flex justify-end gap-x-2">
                                    <EditCompanyModal uid={u.uid} />
                                    <DeleteModal title="Eliminar categoria" desc="¿Estas seguro de que desas borrar esta categoria?" deleteFunc={async () => {
                                        console.log("Borrando compañia: " + u.uid);
                                        await fetch(`companies/delete/${u.uid}`, { method: "POST" });
                                        navigate('.', { replace: true });
                                    }} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};