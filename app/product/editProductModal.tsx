import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { EditButton, ModalButton } from "~/components/primaryButton";
import { useFetcher, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import { addProductSchema, type TaddProductSchema } from "./productSchema";
import type { IProduct } from "./product";
import type { ICategory } from "~/category/category";

const EditProductModal = function ({ uid }: { uid: string }) {
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const navigate = useNavigate();
    const [product, setProduct] = useState<IProduct | null>(null);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        const getCategory = async () => {
            const data = await fetch("http://localhost:8000/api/v1/category/");
            const json = await data.json();
            setCategories(json);
            const response = await fetch("http://localhost:8000/api/v1/product/" + uid);
            const product = await response.json() as IProduct | null;
            setProduct(product);
            setValue("name", product?.name || "");
            setValue("description", product?.description || "");
            setValue("category_uid", product?.category.uid || "");
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
    } = useForm<TaddProductSchema>({
        resolver: zodResolver(addProductSchema),
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
                    <strong>Editar producto: {product?.name}</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="post" action={`/products/${uid}`}>
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
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="category">Selecciona una categoria</Label>
                                </div>
                                <Select id="category" {...register("category_uid")} required>
                                    {categories.map((category) => (
                                        <option key={category.uid} value={category.uid}>{category.name}</option>
                                    ))}
                                </Select>
                                {errors?.category_uid?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.category_uid?.message}`}</p>
                                )}
                            </div>
                        </div>
                        <ModalFooter className="pt-3 flex justify-end">
                            <ModalButton disabled={!isDirty || !isValid} size="lg" type="submit">
                                Editar producto
                            </ModalButton>
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EditProductModal;