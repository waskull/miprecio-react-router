import { Button, Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import type { ICategory } from "~/category/category";
export default function AddProductModal() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    async function loadData(){
        const data = await fetch("http://localhost:8000/api/v1/category/");
        const json = await data.json();
        setCategories(json);
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
                    Agregar producto
                </div>
            </Button>
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nuevo producto</strong>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 ">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
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
                                    placeholder="Una bebida refrescante"
                                    type="description"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category">Selecciona una categoria</Label>
                            </div>
                            <Select id="category" required>
                                {categories.map((category) => (
                                    <option key={category.uid} value={category.uid}>{category.name}</option>
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