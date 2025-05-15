/* import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router"; */
import SignUpForm from "~/auth/signForm";

export default function Signup() {
    return (
        <div>
            {/* <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
                Crear una cuenta
            </h1> */}
            <SignUpForm></SignUpForm>
            {/* <form>
                <div className="mb-4 flex flex-col gap-y-3">
                    <Label htmlFor="email">Tú correo</Label>
                    <TextInput
                        id="email"
                        name="email"
                        placeholder="name@company.com"
                        type="email"
                    />
                </div>
                <div className="mb-6 flex flex-col gap-y-3">
                    <Label htmlFor="password">Tú contraseña</Label>
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
                <div className="mb-6 flex items-center gap-x-3">
                    <Checkbox id="acceptTerms" name="acceptTerms" />
                    <Label htmlFor="acceptTerms">
                        Acepto los &nbsp;
                        <a href="#" className="text-primary-700 dark:text-primary-200">
                            terminos y condiciones
                        </a>
                    </Label>
                </div>
                <div className="mb-7">
                    <Button type="submit" className="w-full lg:w-auto">
                        Crear cuenta
                    </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    Ya tienes una cuenta?&nbsp;
                    <Link className="text-primary-600 dark:text-primary-200" to="/auth/signin">Inicia sesión aca</Link>
                </p>
            </form> */}
        </div>
    );
}