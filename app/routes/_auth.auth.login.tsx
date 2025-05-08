/* import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router"; */
import type { FC } from "react";
import LoginForm from "~/components/userLoginForm";

const SignInPage: FC = function () {
  return (
    <div >
      <LoginForm />
       {/*  
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Inicio de sesión
        </h1>
        <form>
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Recuerdame</Label>
            </div>
            <a
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Olvidaste tu contraseña?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            No estas registrado?&nbsp;
            <Link className="text-primary-600 dark:text-primary-200" to="/auth/signup">Crear cuenta aca</Link>
          </p>
        </form> */}
    </div>
  );
};

export default SignInPage;