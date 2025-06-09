import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import PrimaryButton, { ModalButton } from "~/components/primaryButton";
import type { IUser } from "~/user/user";
import { useFetcher } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import { addCompanySchema, type TaddCompanySchema } from "./companySchema";

export default function AddCompanyModal({ isAdmin }: { isAdmin: boolean }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([]);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
    }, [fetcher]);
    const {
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<TaddCompanySchema>({
        resolver: zodResolver(addCompanySchema),
        mode: "all",
    });
    async function loadData() {
        const data = await fetch("http://localhost:8000/api/v1/user/");
        const json = await data.json();
        setUsers(json);
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <PrimaryButton onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Agregar compañia
                </div>
            </PrimaryButton>
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nueva compañia</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="post" action="/companies">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 ">
                            <div>
                                <Label htmlFor="name">Nombre de la compañia</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("name")}
                                        id="name"
                                        name="name"
                                        placeholder="Super Market"
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
                                        id="description"
                                        name="description"
                                        placeholder="Supermercado donde todo es super economico"
                                        type="description"
                                    />
                                </div>
                                {errors?.description?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.description?.message}`}</p>
                                )}
                            </div>

                            {isAdmin && <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="partner_uid">Selecciona un usuario</Label>
                                </div>
                                <Select {...register("partner_uid")} name="partner_uid" id="partner_uid">
                                    {users.map((user: IUser) => (
                                        <option key={user.uid} value={user.uid}>{user.fullname}</option>
                                    ))}
                                </Select>
                                {errors?.partner_uid?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.partner_uid?.message}`}</p>
                                )}
                            </div>}
                        </div>
                        <div className="pt-2 pb-2">
                            {Array.isArray(data?.errors) ? (
                                data?.errors.map((error: string) => (
                                    <p key={error} className="text-red-500 font-semibold dark:text-red-600">{`${error || ""}`}</p>
                                ))
                            ) : (
                                <p className={data?.error ? "text-red-500 font-semibold dark:text-red-600" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${data?.message || ""}`}</p>
                            )}
                        </div>
                        <ModalFooter className="pt-3 flex justify-end">
                            <ModalButton disabled={!isDirty || !isValid} size="lg" type="submit">
                                Crear compañia
                            </ModalButton>
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div >
    );
}