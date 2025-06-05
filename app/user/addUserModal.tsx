import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addUserSchema, type TaddUserSchema } from "./userSchema";
import PrimaryButton, { ModalButton } from "~/components/primaryButton";
import { RoleObject } from "~/util/role-enum";
import type { GenericError } from "~/interfaces/error";
import LoadingButton from "~/components/loadingButton";
import { useFetcher } from "react-router";
export default function AddUserModal() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
    }, [fetcher]);
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
        reset,
    } = useForm<TaddUserSchema>({
        resolver: zodResolver(addUserSchema),
        mode: "all",
    });
    /*     const onSubmit = async (data: TaddUserSchema) => {
            const valid = await trigger();
            console.log(valid ? data : 'Invalid');
            const response = await addUser(data);
            if (response?.error) return setErrs(response);
            else if (Array.isArray(response)) return setErrs(response);
            console.log(response);
            setOpen(false);
        }; */
    return (
        <div>
            <PrimaryButton onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Agregar usuario
                </div>
            </PrimaryButton>
            <Modal className="backdrop-blur-xs" onClose={() => setOpen(!isOpen)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Agregar nuevo usuario</strong>
                </ModalHeader>

                <ModalBody>
                    <fetcher.Form method="post" action="/users">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                            <div>
                                <Label htmlFor="fullname">Nombre Completo</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("fullname")}
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Bonnie"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Correo</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("email")}
                                        id="email"
                                        name="email"
                                        placeholder="correo@correo.com"
                                        type="email"
                                    />
                                </div>
                                {errors?.email?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.email?.message}`}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("password")}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="abcdef" />
                                </div>
                                {errors?.password?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.password?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("confirmPassword")}
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="abcdef" />
                                </div>
                                {errors?.confirmPassword?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.confirmPassword?.message}`}</p>
                                )}
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
                                <p className={data?.error ? "text-red-500 dark:text-red-600" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${data?.error || ""}`}</p>
                            )}
                        </div>

                        {/* <div className="pt-2 pb-2">
                            {fetcher?.data?.error ? (
                                <p className="text-red-500 dark:text-red-600">{`${fetcher?.data?.error || ""}`}</p>
                            ) : (
                                fetcher?.data?.errors.map((error: string) => (
                                    <p key={error} className="text-red-500 dark:text-red-600">{`${error || ""}`}</p>
                                ))
                            )
                            }
                        </div> */}

                        <ModalFooter className="flex justify-end ">
                            {loading ? <LoadingButton /> : <ModalButton disabled={!isDirty || !isValid} type="submit">Agregar usuario</ModalButton>}
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div >
    );
}