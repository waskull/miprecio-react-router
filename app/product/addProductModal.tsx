import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useFetcher } from "react-router";
import type { ICategory } from "~/category/category";
import PrimaryButton, { ModalButton } from "~/components/primaryButton";
import type { GenericError } from "~/interfaces/error";
import { addProductSchema, type TaddProductSchema } from "./productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function AddProductModal() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
    }, [fetcher]);
    const {
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<TaddProductSchema>({
        resolver: zodResolver(addProductSchema),
        mode: "all",
    });
    async function loadData() {
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
            <PrimaryButton onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Agregar producto
                </div>
            </PrimaryButton>
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nuevo producto</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="post" action="/products">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 ">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("name")}
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
                                        {...register("description")}
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
                                <Select id="category" {...register("category_uid")} required>
                                    {categories.map((category) => (
                                        <option key={category.uid} value={category.uid}>{category.name}</option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <ModalFooter className="flex justify-end ">
                            <ModalButton disabled={!isDirty || !isValid} type="submit">Agregar producto</ModalButton>
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div>
    );
}