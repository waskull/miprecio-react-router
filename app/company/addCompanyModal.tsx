import { Button, Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import type { IUser } from "~/user/user";
export default function AddCompanyModal() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([]);
    async function loadData(){
        const data = await fetch("http://localhost:8000/api/v1/user/");
        const json = await data.json();
        setUsers(json);
        console.table(json);
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <Button color="blue" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Agregar compañia
                </div>
            </Button>
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nueva compañia</strong>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 ">
                        <div>
                            <Label htmlFor="name">Nombre de la compañia</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder="Pepsi"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description">Descripción</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="description"
                                    name="description"
                                    placeholder="Supermercado donde todo es super economico"
                                    type="description"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="users">Selecciona un usuario</Label>
                            </div>
                            <Select id="users" required>
                            {users.map((user: IUser) => (
                                    <option key={user.uid} value={user.uid}>{user.fullname}</option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="flex self-end content-end border-0">
                    <Button color="blue" size="lg" onClick={() => setOpen(false)}>
                        Agregar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}