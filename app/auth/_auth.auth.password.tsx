import type { MetaFunction } from "react-router";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useFetcher, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordRecoverSchema, type TpasswordRecoverSchema } from "./authSchemas";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import LoadingButton from "~/components/loadingButton";
import type { Route } from "./+types/_auth.auth.password";
import { passwordReset } from "./authService";

export const meta: MetaFunction = () => {
    return [
        { title: "Recuperar contraseña" },
        { name: "description", content: "MiPrecio" },
    ];
};

export default function PasswordRecoveryPage({ actionData }: Route.ComponentProps) {
    const [loading, setLoading] = useState(false);
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<TpasswordRecoverSchema>({
        resolver: zodResolver(PasswordRecoverSchema),
        mode: "all",
    });
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        setLoading(fetcher?.state !== "idle");
        setData(fetcher?.data);
    }, [fetcher]);
    return (
        <div>
            <fetcher.Form method="post">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-200 md:text-3xl">
                    Restaurar contraseña
                </h1>
                <div className="mb-4 flex flex-col gap-y-3">
                    <Label htmlFor="email">Correo</Label>
                    <TextInput
                        {...register("email")}
                        id="email"
                        name="email"
                        placeholder="correo@correo.com"
                        type="email"
                    />
                    {errors?.email?.message && (
                        <p className="text-red-500 dark:text-red-600">{`${errors?.email?.message}`}</p>
                    )}
                </div>
                <div className="mb-6">
                    {!loading ? (
                        <Button
                            type="submit"
                            /* onClick={handleSubmit(onSubmit)} */
                            className="w-full lg:w-full bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-500 dark:focus:bg-gray-100"
                        >
                            Enviar clave de recuperación
                        </Button>
                    ) : (
                        <LoadingButton />
                    )}
                </div>
                <div className="pb-2">
                    {Array.isArray(data?.errors) ? (
                        data?.errors.map((error: string) => (
                            <p key={error} className="text-red-500 dark:text-red-600">{`${error || ""}`}</p>
                        ))
                    ) : (
                        <p className={data?.error ? "text-red-500 dark:text-red-600" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${data?.error || ""}`}</p>
                    )}
                    {data?.message && <p className="text-green-500 dark:text-green-600">{`${data?.message || ""}`}</p>}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    Recordaste tu contraseña?&nbsp;
                    <Link
                        to={"/auth/signin"}
                        className="cursor-pointer hover:underline text-gray-900 font-bold dark:text-zinc-400"
                    >
                        Iniciar sesión
                    </Link>
                </p>
            </fetcher.Form>
        </div>
    );
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as TpasswordRecoverSchema;
    const result = await passwordReset(data.email);
    console.log(result);
    if (!result) { return { error: "Algo salio mal al intentar restablecer la contraseña", status: 500 } }
    if (Array.isArray(result)) return { errors: result };
    //if (result?.error_code) { return { error: result?.message, error_code: result?.error_code } };
    if (result?.error) return result;
    return { message: "Se ha enviado un codigo a tu correo para restablecer tu contraseña" };
}