import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter } from "flowbite-react";
import { type FC, useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import PrimaryButton, { ModalButton } from "~/components/primaryButton";
import { useFetcher } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import { addCategorySchema, type TaddCategorySchema } from "./categorySchema";

const AddCategoryModel: FC = function () {
    const [isOpen, setOpen] = useState(false);
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
    } = useForm<TaddCategorySchema>({
        resolver: zodResolver(addCategorySchema),
        mode: "all",
    });
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
                    <fetcher.Form method="post" action="/categories">
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
                            </div>
                        </div>
                        <ModalFooter className="pt-3 flex justify-end">
                            <ModalButton disabled={!isDirty || !isValid} size="lg" type="submit">
                                Crear categoria
                            </ModalButton>
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default AddCategoryModel;