import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter } from "flowbite-react";
import { type FC, useState } from "react";
import { HiPlus } from "react-icons/hi";
import PrimaryButton from "~/components/primaryButton";

const AddCategoryModel: FC = function () {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <PrimaryButton onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Agregar categoria
                </div>
            </PrimaryButton>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Crear Categoria</strong>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder="Bebidas"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description">Descripción</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="description"
                                    name="description"
                                    placeholder="Bebidas"
                                    type="description"
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-end">
                    <PrimaryButton size="lg" onClick={() => setOpen(false)}>
                        Crear categoria
                    </PrimaryButton>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default AddCategoryModel;