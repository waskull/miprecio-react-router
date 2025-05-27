import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Badge } from "flowbite-react";
import type { JSX } from "react";
import DeleteModal from "~/components/DeleteModal";
import type { IUser } from "~/user/user";
import { RoleObject } from "~/util/role-enum";
import EditUserModal from "./editUserModal";
import { useNavigate } from "react-router";

export default function UserList({ data }: { data: IUser[] }): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <table className="w-full divide-gray-200 dark:divide-gray-600 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telefono
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((u: IUser) => (
                        <tr key={u.uid} className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0 px-6 py-4 font-medium text-gray-900 dark:text-white">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="/favicon.ico"
                                    alt="Neil Sims avatar"
                                />
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                                        {u.fullname}
                                    </div>
                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {u.email}
                                    </div>
                                </div>
                            </th>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                {u.role === RoleObject.admin ? "Administrador" : u.role === RoleObject.partner ? "Socio" : "Usuario"}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                {u?.phone}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                <div className="flex items-center">
                                    {u.is_verified ? (
                                        <Badge color="success">Verificado</Badge>

                                    ) : (
                                        <Badge color="failure">No verificado</Badge>
                                    )}

                                </div>
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                                <div className="flex justify-end gap-x-2">
                                    <EditUserModal />
                                    <DeleteModal title="Eliminar usuario" desc="¿Estas seguro de que desas borrar este usuario?" deleteFunc={async () => {
                                        console.log("Borrando producto: " + u.uid);
                                        await fetch(`users/delete/${u.uid}`, { method: "POST" });
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

