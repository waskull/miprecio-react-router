import LoginForm from "~/auth/loginForm";
import type { Route } from "./+types/_auth.auth.login";
import { signIn } from "./authService";
import type { TsignInSchema } from "./authSchemas";
import { redirect } from "react-router";
import { commitSession, getSession } from "~/sessions.server";

export async function action({
  request,
}: Route.ActionArgs) {
  try {
    const session = await getSession(
      request.headers.get("Cookie")
    );
    let formData = await request.formData();
    const data = Object.fromEntries(formData) as TsignInSchema;
    const result = await signIn(data);
    console.log(result);
    if (!result) { return { error: "Algo salio mal al iniciar sesion", status: 500 } }
    if (Array.isArray(result)) return {errors: result};
    if (result?.error_code) { return { error: result?.message, error_code: result?.error_code } };
    if (result?.user) {
      session.set("user", result?.user);
      session.set("access_token", result?.access_token);
      session.set("refresh_token", result?.refresh_token);
      return redirect("/home", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  } catch (e) {
    console.log(e);
    if (e instanceof Error) return e;
    return { error: "Algo salio mal", status: 500 };
  }
}



export default function SignInPage({ actionData }: Route.ComponentProps) {
  return (
    <LoginForm actionData={actionData} />
  );
};

