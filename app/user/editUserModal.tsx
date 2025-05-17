import { Button, Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter } from "flowbite-react";
import { type FC, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { EditButton } from "~/components/primaryButton";

const EditUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <EditButton size="sm" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                </div>
            </EditButton>
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

export default EditUserModal;