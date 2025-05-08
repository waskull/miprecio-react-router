import { Badge, Pagination as TablePagination, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { Route } from "./+types/_dashboard.user";
import { useEffect, useState } from "react";
import {
    Button,
    Label,
    Modal,
    TextInput,
} from "flowbite-react";
import type { FC, JSX } from "react";
import {
    HiChevronLeft,
    HiChevronRight,
    HiDocumentDownload,
    HiOutlineExclamationCircle,
    HiOutlinePencilAlt,
    HiPlus,
    HiTrash,
} from "react-icons/hi";
import type { IUser } from "~/interfaces/user";
import { Role } from "~/util/role-enum";
import NavBar from "~/components/navbar";
import DeleteModal from "~/components/DeleteModal";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/user/");
        const json = await data.json();
        return json;
    } catch (e) {
        return [];
    }
}

export default function UserList({
    loaderData,
}: Route.ComponentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [data, setData] = useState<IUser[]>(loaderData);
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
                            <AllUsersTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Pagination data={data.length | 0} /> */}
            <div className="flex flex-col overflow-x-auto justify-center sticky w-full items-center border-t border-gray-200 bg-white pt-2 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-4">
                <TablePagination currentPage={currentPage} totalPages={data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
};

function AllUsersTable({ data }: { data: IUser[] }): JSX.Element {
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

const EditUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Button className="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-400 focus:bg-yellow-400 dark:focus:bg-yellow-400 text-gray-600 dark:text-gray-600 focus:ring-yellow-300 dark:focus:ring-yellow-500" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Editar usuario</strong>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">Nombre Completo</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Bonnie"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Correo</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    placeholder="correo@correo.com"
                                    type="email"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="mt-1">
                                <TextInput type="password" id="password" name="password" placeholder="1234" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="confirm_password">Confirmar contraseña</Label>
                            <div className="mt-1">
                                <TextInput type="confirm_password" id="confirm_password" name="confirm_password" placeholder="1234" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone">Telefono Móvil</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    placeholder="e.g., +(58)41485236512"
                                    type="tel"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="address">Dirección</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="address"
                                    name="address"
                                    placeholder="Dirección"
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-end">
                    <Button color="blue" className="w-32" onClick={() => setOpen(false)}>
                        Editar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
