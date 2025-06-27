import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import type { IProduct } from "~/product/product";
import { ModalButton, EditButton } from "~/components/primaryButton";
import { useFetcher, useNavigate, type NavigateFunction } from "react-router";
import { addProductStoreSchema, editProductStoreSchema, type TaddProductStoreSchema, type TeditProductStoreSchema } from "./storeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import LoadingButton from "~/components/loadingButton";
import type { IStore } from "./store";
import apiURL from "~/apiURL";
export default function EditStoreProductModal({ uid, companyId, isOpen, setOpen }: { uid: string, companyId: string, isOpen: boolean, setOpen: (isOpen: boolean) => void }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<IProduct[]>([]);
    const [data, setData] = useState<GenericError | null>(null);
    const [product, setProduct] = useState<IStore | null>(null);
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const {
        register,
        setValue,
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
        console.log(fetcher.data);
        if (fetcher?.data?.success) {
            window.location.reload();
            setOpen(false);
            reset();
        }
    }, [fetcher]);
    async function loadData() {
        const data = await fetch(`${apiURL}/product/`);
        const json = await data.json();
        setCategories(json);
        const response = await fetch(`${apiURL}/store/company/${companyId}/product/${uid}`);
        const res = await response.json() as IStore | null;        
        setValue("product_uid", res?.product.uid || "");
        setProduct(res);
    }
    useEffect(() => {;
        loadData();
    }, []);
    return (
        < Modal className="backdrop-blur-xs" onClose={() => setOpen(false)
        } show={isOpen} >
            <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                <strong>Editar producto: {product?.product.name || ""}</strong>
            </ModalHeader>
            <ModalBody>
                <fetcher.Form method="POST" action={`/store/edit/${companyId}`} className="grid grid-cols-1 gap-6 sm:grid-cols-1 ">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div hidden>
                            <div className="mb-2 block">
                                <Label htmlFor="product">Selecciona un producto</Label>
                            </div>
                            <Select id="product" {...register("product_uid")}
                                defaultValue={product?.product.uid}
                                name="product_uid"
                                title="Selecciona un producto"
                                required>
                                {categories.map((product) => (
                                    <option key={product.uid} value={product.uid}>{product.name}</option>
                                ))}
                            </Select>
                            {errors?.product_uid?.message && (
                                <p className="text-red-500 dark:text-red-600">{`${errors?.product_uid?.message}`}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="price">Precio</Label>
                            <div className="mt-1">
                                <TextInput
                                    {...register('price', {
                                        setValueAs: (v) => v === "" ? undefined : parseInt(v, 10),
                                    })}
                                    defaultValue={product?.price}
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
                                    defaultValue={product?.wholesale_price}
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
                                    defaultValue={product?.discount}
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
                        {loading ? <LoadingButton /> : <ModalButton disabled={!isDirty || !isValid} type="submit">Editar producto</ModalButton>}
                    </ModalFooter>
                </fetcher.Form>
            </ModalBody>
        </Modal >
    );
}

{/*  <EditButton size="sm" onClick={() => setOpen(!isOpen)}>
                                            <div className="flex items-center gap-x-2">
                                                <HiOutlinePencilAlt className="text-lg" />
                                            </div>
                                        </EditButton> */}