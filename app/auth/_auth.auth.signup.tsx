import type { MetaFunction } from "react-router";
import type { Route } from "./+types/_auth.auth.signup";
import SignUpForm from "./signForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Crear cuenta" },
    { name: "description", content: "MiPrecio" },
  ];
};

export default function SignUpPage({ actionData }: Route.ComponentProps) {
  return (
    <SignUpForm actionData={actionData} />
  );
}