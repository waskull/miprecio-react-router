"use client";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoadingButton from "./loadingButton";
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Inicio de sesión
        </h1>
        <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="email">Correo</Label>
          <TextInput
            id="email"
            name="email"
            placeholder="correo@correo.com"
            type="email"
          />
        </div>
        <div className="mb-6 flex flex-col gap-y-3">
          <Label htmlFor="password">Contraseña</Label>
          <TextInput
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Checkbox id="rememberMe" name="rememberMe" />
            <Label htmlFor="rememberMe">Recordarme</Label>
          </div>
          <a
            href="#"
            className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
          >
            Olvidaste tu contraseña?
          </a>
        </div>
        <div className="mb-6">
          {!loading ? (
            <Button
              color="blue"
              type="submit"
              onClick={async (e: React.SyntheticEvent) => {
                e.preventDefault();
                setLoading(true);
                await sleep(4000);
                navigate("/home");
              }}
              className="w-full lg:w-full"
            >
              Iniciar sesión
            </Button>
          ) : (
            <LoadingButton />
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          No tienes una cuenta?&nbsp;
          <a
            onClick={() => {
              if (!loading) {
                navigate("/auth/signup");
              }
            }}
            className="cursor-pointer text-primary-600 hover:underline dark:text-primary-300"
          >
            Crear cuenta
          </a>
        </p>
      </form>
    </div>
  );
}
