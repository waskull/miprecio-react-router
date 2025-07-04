import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useFetcher, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LoadingButton from "../components/loadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, type TsignInSchema } from "./authSchemas";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";

export default function LoginForm({ actionData }: any) {
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  /* const onSubmit = async (data: TsignInSchema) => {
    const valid = await trigger();
    console.log(valid ? data : 'Invalid');
    const response = await signIn(data);
    if (response?.error) return setErrs(response);
    else if (Array.isArray(response)) return setErrs(response);
    console.log(response);
    //await sleep(2000);
    //navigate("/home");
  }; */
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TsignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: "all",
  });
  const [data, setData] = useState<GenericError | null>(null);
  useEffect(() => {
    console.log(fetcher);
    setLoading(fetcher?.state !== "idle");
    setData(fetcher?.data);
  }, [fetcher]);
  return (
    <div>
      <fetcher.Form method="post">
        <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-200 md:text-3xl">
          Inicio de sesión
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
        <div className="mb-6 flex flex-col gap-y-3">
          <Label htmlFor="password">Contraseña</Label>
          <TextInput
            {...register("password")}
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 dark:text-red-600">{`${errors.password.message}`}</p>
          )}
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Checkbox id="rememberMe" name="rememberMe" />
            <Label htmlFor="rememberMe">Recordarme</Label>
          </div>
          <Link
            to="/auth/password"
            className="w-1/2 text-right text-sm text-gray-900 font-bold dark:text-zinc-400 hover:underline"
          >
            Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="mb-6">
          {Array.isArray(actionData) ? (
            actionData.map((msg: string) => (
              <p key={msg} className="text-red-500 dark:text-red-600 mb-4">{`${msg}`}</p>
            ))
          ) : (
            <p className={actionData?.error ? "text-red-500 dark:text-red-600 mb-4" : "text-gray-900 dark:text-gray-400 mb-4"}>{`${actionData?.message || ""}`}</p>
          )}
          {!loading ? (
            <Button
              type="submit"
              /* onClick={handleSubmit(onSubmit)} */
              className="w-full lg:w-full bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-500 dark:focus:bg-gray-100"
            >
              Iniciar sesión
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
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          No tienes una cuenta?&nbsp;
          <Link
            to={"/auth/signup"}
            className="cursor-pointer hover:underline text-gray-900 font-bold dark:text-zinc-400"
          >
            Crear cuenta
          </Link>
        </p>
      </fetcher.Form>
    </div>
  );
}
