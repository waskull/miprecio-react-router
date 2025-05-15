import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Badge } from "flowbite-react";
import type { JSX } from "react";
import DeleteModal from "~/components/DeleteModal";
import type { IUser } from "~/user/user";
import { Role } from "~/util/role-enum";
import EditUserModal from "./editUserModal";

export default function UserList({ data }: { data: IUser[] }): JSX.Element {
    return (
        <Table className="min-w-full divide-y mt-0 divide-gray-200 dark:divide-gray-600">
            <TableHead className="bg-gray-100 dark:bg-gray-700">
                {/* <TableHeadCell>
                    <Label htmlFor="select-all" className="sr-only">
                        Select all
                    </Label>
                    <Checkbox id="select-all" name="select-all" />
                </TableHeadCell> */}
                <TableHeadCell>Usuario</TableHeadCell>
                {/* <TableHeadCell>Correo</TableHeadCell> */}
                <TableHeadCell>Rol</TableHeadCell>
                <TableHeadCell>Telefono</TableHeadCell>
                <TableHeadCell>Estado</TableHeadCell>
                <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">

                {data.map((u: IUser) => (
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
                                    {u.fullname}
                                </div>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {u.email}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                            {u.role === Role.admin ? "Administrador" : u.role === Role.partner ? "Socio" : "Usuario"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 dark:text-white">
                            {u?.phone}
                        </TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            <div className="flex items-center">
                                {u.is_verified ? (
                                    <Badge color="success">Verificado</Badge>

                                ) : (
                                    <Badge color="failure">No verificado</Badge>
                                )}

                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-x-2 whitespace-nowrap">
                                <EditUserModal />
                                <DeleteModal title="Eliminar usuario" desc="¿Estas seguro de que desas borrar este usuario?" deleteFunc={async () => console.log("Borrando usuario")} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    );
};

