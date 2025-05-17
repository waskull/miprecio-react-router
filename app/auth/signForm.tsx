import {
  Button,
  Checkbox,
  Label,
  Popover,
  TextInput,
} from "flowbite-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoadingButton from "../components/loadingButton";
import PrimaryButton from "~/components/primaryButton";
export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <form>
      <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
        Registrar cuenta
      </h1>
      <div className="mb-4 flex flex-col gap-y-3">
        <Label htmlFor="email">Correo</Label>
        <TextInput
          id="email"
          name="email"
          placeholder="name@company.com"
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
      <div className="mb-6 flex flex-col gap-y-3">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <TextInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          type="password"
        />
      </div>
      <div className="mb-4 flex items-center gap-x-3">
        <Checkbox id="acceptTerms" name="acceptTerms" />
        <Label htmlFor="acceptTerms">
          <Popover
            aria-labelledby="default-popover"
            trigger="hover"
            content={
              <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <h3
                    id="default-popover"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    Terminos y condiciones
                  </h3>
                </div>
                <div className="px-3 py-2">
                  Yo acepto los&nbsp;
                  <a
                    href="#"
                    className="text-primary-700 dark:text-primary-200"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi sunt porro totam similique ea maiores provident ipsam
                    commodi quibusdam quisquam, laboriosam omnis officia
                    deserunt ad unde! Qui dolores adipisci dolorum!
                  </a>
                </div>
              </div>
            }
          >
            <div>
              Yo acepto los&nbsp;
              <a href="#" className="text-gray-900 font-bold dark:text-zinc-400">
                Terminos y condiciones
              </a>
            </div>
          </Popover>
        </Label>
      </div>
      <div className="mb-4">
        {!loading ? (
          <PrimaryButton
            onClick={async () => {
              setLoading(true);
              await sleep(3000);
              setLoading(false);
              navigate("/auth/signin");
            }}
          >
            Crear Cuenta
          </PrimaryButton>
        ) : (
          <LoadingButton />
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Ya tienes una cuenta?&nbsp;
        <a
          onClick={() => {
            if (!loading) {
              navigate("/auth/signin");
            }
          }}
          className="cursor-pointer text-gray-900 font-bold dark:text-zinc-400 hover:underline "
        >
          Iniciar sesión
        </a>
      </p>
    </form>
  );
}
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
