import { TabItem, Tabs, type TabsRef } from "flowbite-react";
import { HiUserCircle, HiAdjustments } from "react-icons/hi";
import type { GenericError } from "~/interfaces/error";
import { redirect, useFetcher, useLoaderData, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema, editUserPasswordSchema, type TeditUserPasswordSchema, type TprofileSchema } from "./profileSchema";
import { ModalButton } from "~/components/primaryButton";
import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/_dashboard.profile";
import { getSession } from "~/sessions.server";
import apiURL from "~/apiURL";
import { editProfile, editPassword } from "./profileService";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const data = await fetch(`${apiURL}/auth/me`, { method: "GET", headers: { authorization: `Bearer ${session.get("access_token")}` } });
    const response = await data.json();
    return response;
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const user = session.get("user");
    const formData = await request.formData();
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    try {
        if (searchParams.has("password") && searchParams.get("password") === "true") {
            const data = Object.fromEntries(formData) as TeditUserPasswordSchema;
            console.log("password form: ", data);
            const result = await editPassword(data, session.get("access_token") ?? "");
            console.log("result password: ", result);
            if (!result?.error) return redirect("/profile?password=true");
            return result;
        } else if (searchParams.has("password") && searchParams.get("password") === "false") {
            const data = Object.fromEntries(formData) as TprofileSchema;
            console.log("profile form: ", data);
            const result = await editProfile(data, session.get("access_token") ?? "");
            console.log("profile: ", result);
            if (!result?.error) return redirect("/profile?password=false");
            return result;
        }
        return "Ha ocurrido un error inesperado";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}

export default function Profile() {
    const [searchParams, setSearchParams] = useSearchParams();
    const loaderData = useLoaderData();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);
    const fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const tab = searchParams.get("password");
        if (searchParams.has("password") && tab === "true") tabsRef.current?.setActiveTab(1);
    }, [])
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
        console.log("data: ", data);
    }, [fetcher]);
    const {
        register,
        formState: { errors, isValid, isDirty },
    } = useForm<TprofileSchema>({
        resolver: zodResolver(profileSchema),
        mode: "all",
    });
    const paswrd = useForm<TeditUserPasswordSchema>({
        resolver: zodResolver(editUserPasswordSchema),
        mode: "all",
    });
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 shadow ">
                            <Tabs ref={tabsRef} aria-label="Tabs with underline" variant="underline" onActiveTabChange={(tab) => { setActiveTab(tab); setSearchParams({ password: tab === 1 ? "true" : "false" }); setData(null); }}>
                                <TabItem active title="Perfil" icon={HiUserCircle}>
                                    <section className="bg-white sticky dark:bg-gray-900">
                                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Mi Perfil</h2>
                                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Para editar tus datos, por favor llena el siguiente formulario y presiona el boton Guardar cambios.</p>
                                            <fetcher.Form method="post" className="space-y-8">
                                                <div>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-400">Correo</label>
                                                    <input defaultValue={loaderData.email} type="email" disabled id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="correo@test.com" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-400">Rol</label>
                                                    <input defaultValue={loaderData?.role === "admin" ? "Administrador" : loaderData?.role === "user" ? "Usuario" : "Socio"} type="text" disabled id="role" className="block p-3 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Usuario" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre Completo</label>
                                                    <input defaultValue={loaderData.fullname} {...register("fullname")} type="text" id="fullname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Juan Perez" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="dni" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cedula</label>
                                                    <input defaultValue={loaderData?.dni} {...register("dni")} type="text" id="dni" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="24432123" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Telefono</label>
                                                    <input defaultValue={loaderData?.phone} {...register("phone")} type="text" id="phone" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="0424432854" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha de nacimiento</label>
                                                    <input defaultValue={loaderData?.birthdate} {...register("birthdate")} type="date" id="birthdate" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="01/01/2000" required />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tu dirección</label>
                                                    <textarea defaultValue={loaderData?.address} {...register("address")} id="address" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="AV Bolivar, CC Bolivar Piso 2, Negocio #4"></textarea>
                                                </div>


                                                {Array.isArray(data?.errors) ? (
                                                    data?.errors.map((error: string) => (
                                                        <p key={error} className="text-red-500 dark:text-red-600">{`${error || ""}`}</p>
                                                    ))
                                                ) : (
                                                    <p className={data?.error ? "text-red-500 dark:text-red-600" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${data?.message || ""}`}</p>
                                                )}

                                                <ModalButton disabled={!isDirty || !isValid} type="submit" size="md">Guardar cambios</ModalButton>
                                            </fetcher.Form>
                                        </div>
                                    </section>
                                </TabItem>
                                <TabItem title="Cambiar Clave" icon={HiAdjustments}>
                                    <section className="bg-white sticky dark:bg-gray-900">
                                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Cambiar contraseña</h2>
                                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Para cambiar tu contraseña, por favor llena el siguiente formulario y presiona el boton Cambiar contraseña.</p>
                                            <fetcher.Form method="post" className="space-y-8">
                                                <div>
                                                    <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vieja Contraseña</label>
                                                    <input {...paswrd.register("old_password")} type="password" id="old_password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Vieja Contraseña" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nueva Contraseña</label>
                                                    <input {...paswrd.register("newpassword")} type="password" id="newpassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Nueva Contraseña" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="confirm_newpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirmar Contraseña</label>
                                                    <input {...paswrd.register("confirm_newpassword")} type="password" id="confirm_newpassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Confirmación de nueva Contraseña" required />
                                                </div>


                                                {Array.isArray(data?.errors) ? (
                                                    data?.errors.map((error: string) => (
                                                        <p key={error} className="text-red-500 dark:text-red-600">{`${error || ""}`}</p>
                                                    ))
                                                ) : (
                                                    <p className={data?.error ? "text-red-500 dark:text-red-600" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${data?.message || ""}`}</p>
                                                )}

                                                <ModalButton disabled={!paswrd.formState.isDirty || !paswrd.formState.isValid} type="submit" size="md">Editar contraseña</ModalButton>
                                            </fetcher.Form>
                                        </div>
                                    </section>
                                </TabItem>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}