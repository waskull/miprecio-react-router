import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { EditButton, ModalButton } from "~/components/primaryButton";
import { useFetcher, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import { addCategorySchema, type TaddCategorySchema } from "./categorySchema";
import type { ICategory } from "./category";
import apiURL from "~/apiURL";

const EditCategoryModel = function ({ uid }: { uid: string }) {
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [category, setCategory] = useState<ICategory | null>(null);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch(`${apiURL}/category/${uid}`);
            const category = await response.json() as ICategory | null;
            setCategory(category);
            setValue("name", category?.name || "");
            setValue("description", category?.description || "");
        }
        getCategory();
    }, [])
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
        if (fetcher?.data?.success) {
            navigate(".", { replace: true });
            setOpen(false);

        }
    }, [fetcher]);
    const {
        register,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm<TaddCategorySchema>({
        resolver: zodResolver(addCategorySchema),
        mode: "all",
    });
    return (
        <div>
            <EditButton size="sm" onClick={() => setOpen(!isOpen)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                </div>
            </EditButton>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Editar Categoria: {category?.name}</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="post" action={`/categories/${uid}`}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pb-2">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("name")}
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Bebidas"
                                    />
                                </div>
                                {errors?.name?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.name?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="description">Descripción</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("description")}
                                        type="text"
                                        id="description"
                                        name="description"
                                        placeholder="Bebidas"
                                    />
                                </div>
                                {errors?.description?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.description?.message}`}</p>
                                )}
                            </div>
                        </div>
                        <ModalFooter className="pt-3 flex justify-end">
                            <ModalButton disabled={!isDirty || !isValid} size="lg" type="submit">
                                Editar categoria
                            </ModalButton>
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EditCategoryModel;