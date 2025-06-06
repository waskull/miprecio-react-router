import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { type FC, useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useFetcher } from "react-router";
import { EditButton, ModalButton } from "~/components/primaryButton";
import { editUserSchema, type TeditUserSchema } from "./userSchema";
import type { GenericError } from "~/interfaces/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoadingButton from "~/components/loadingButton";
import { RoleObject } from "~/util/role-enum";
import type { IUser } from "./user";

export default function EditUserModal({ uid }: { uid: string }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [endpoint] = useState<string>(`/users/${uid}`);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch("http://localhost:8000/api/v1/user/" + uid);
            const user = await response.json() as IUser | null;
            setUser(user);
        }
        getUser();
    }, [])
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
    }, [fetcher]);
    const {
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<TeditUserSchema>({
        resolver: zodResolver(editUserSchema),
        mode: "all",
    });
    return (
        <>
            <EditButton size="sm" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                </div>
            </EditButton>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Editar usuario {user?.fullname}</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="post" action={endpoint}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="fullname">Nombre Completo</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("fullname")}
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Bonnie"
                                        defaultValue={user?.fullname}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="phone">Telefono Móvil</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("phone")}
                                        id="phone"
                                        name="phone"
                                        placeholder="e.g., +(58)41485236512"
                                        type="tel"
                                        defaultValue={user?.phone}
                                    />
                                </div>
                                {errors?.phone?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.phone?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="address">Dirección</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("address")}
                                        id="address"
                                        name="address"
                                        placeholder="Dirección"
                                        defaultValue={user?.address}
                                    />
                                </div>
                                {errors?.address?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.address?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="dni">Cedula</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("dni")}
                                        id="dni"
                                        name="dni"
                                        placeholder="e.g., 21234678"
                                        type="tel"
                                        defaultValue={user?.dni}
                                    />
                                </div>
                                {errors?.dni?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.dni?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("birthdate")}
                                        id="birthdate"
                                        name="birthdate"
                                        type="date"
                                        placeholder="1999-01-01"
                                        defaultValue={user?.birthdate}
                                    />
                                </div>
                                {errors?.birthdate?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.birthdate?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="role">Rol</Label>
                                <div className="mt-1">
                                    <Select
                                        {...register("role")}
                                        id="role"
                                        defaultValue={user?.role}
                                        name="role">
                                        <option value={RoleObject.user}>Usuario</option>
                                        <option value={RoleObject.partner}>Socio</option>
                                    </Select>
                                </div>
                                {errors?.role?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.role?.message}`}</p>
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
                            {loading ? <LoadingButton /> : <ModalButton disabled={!isDirty || !isValid} type="submit">Editar usuario</ModalButton>}
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </>
    );
};