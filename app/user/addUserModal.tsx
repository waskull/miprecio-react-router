import { Button, Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter } from "flowbite-react";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

export default function AddUserModal() {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <div>
            <Button color="blue" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Agregar usuario
                </div>
            </Button>
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nuevo usuario</strong>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
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
                        <div>
                            <Label htmlFor="info">Info adicional</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="info"
                                    name="info"
                                    placeholder="info"
                                />
                            </div>
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