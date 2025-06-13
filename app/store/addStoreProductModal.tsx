import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import type { IProduct } from "~/product/product";
import PrimaryButton, { ModalButton } from "~/components/primaryButton";
import { useFetcher } from "react-router";
import { addProductStoreSchema, type TaddProductStoreSchema } from "./storeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import LoadingButton from "~/components/loadingButton";

export default function AddStoreProductModal({ ids }: { ids: string[] }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [data, setData] = useState<GenericError | null>(null);
    const fetcher = useFetcher();
    const {
        register,
        trigger,
        formState: { errors, isValid, isDirty },
        reset,
    } = useForm<TaddProductStoreSchema>({
        resolver: zodResolver(addProductStoreSchema),
        mode: "all",
    });
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
        if (fetcher?.data?.success) {
            setOpen(false);
            reset();
        }
    }, [fetcher]);
    async function loadData() {
        const data = await fetch("http://localhost:8000/api/v1/product/all/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ uids: ids }) });
        const json = await data.json();
        setProducts(json);
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            {products.length > 0 && (
                <PrimaryButton onClick={() => setOpen(true)}>
                    <div className="flex items-center gap-x-3">
                        <HiPlus className="text-xl" />
                        Agregar producto
                    </div>
                </PrimaryButton>
            )}
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nuevo producto a la tienda</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="POST" className="grid grid-cols-1 gap-6 sm:grid-cols-1 ">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">


                            {products.length > 0 && (
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="product">Selecciona un producto</Label>
                                    </div>
                                    <Select id="product" {...register("product_uid")} required>
                                        {products?.map((product) => (
                                            <option key={product?.uid} value={product?.uid}>{product?.name}</option>
                                        ))}
                                    </Select>
                                </div>
                            )}
                            {errors?.product_uid?.message && (
                                <p className="text-red-500 dark:text-red-600">{`${errors?.product_uid?.message}`}</p>
                            )}
                            <div>
                                <Label htmlFor="price">Precio</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register('price', {
                                            setValueAs: (v) => v === "" ? undefined : parseInt(v, 10),
                                        })}
                                        id="price"
                                        name="price"
                                        placeholder="8.0"
                                        type="number"
                                    />
                                </div>
                                {errors?.price?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.price?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="wholesale_price">Precio al mayor</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register('wholesale_price', {
                                            setValueAs: (v) => v === "" ? undefined : parseInt(v, 10),
                                        })}
                                        id="wholesale_price"
                                        name="wholesale_price"
                                        placeholder="5.5"
                                        type="number"
                                    />
                                </div>
                                {errors?.wholesale_price?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.wholesale_price?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="discount">Descuento</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register('discount', {
                                            setValueAs: (v) => v === "" ? undefined : parseInt(v, 10),
                                        })}
                                        id="discount"
                                        name="discount"
                                        placeholder="10%"
                                        type="number"
                                    />
                                </div>
                                {errors?.discount?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.discount?.message}`}</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-2 pb-2">
                            {Array.isArray(data?.errors) ? (
                                data?.errors.map((error: string) => (
                                    <p key={error} className="text-red-500 dark:text-red-600">{`${error || ""}`}</p>
                                ))
                            ) : (
                                <p className={data?.error ? "text-red-500 dark:text-red-600" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${data?.message || ""}`}</p>
                            )}
                        </div>

                        <ModalFooter className="flex justify-end ">
                            {loading ? <LoadingButton /> : <ModalButton disabled={!isDirty || !isValid} type="submit">Agregar producto</ModalButton>}
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div>
    );
}