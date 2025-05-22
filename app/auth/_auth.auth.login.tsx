import LoginForm from "~/auth/loginForm";
import type { Route } from "./+types/_auth.auth.login";
import { signIn } from "./authService";
import type { TsignInSchema } from "./authSchemas";
import { data, redirect } from "react-router";
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
    if (!result) { throw new Error("Error en la solicitud"); }

    if (result?.user) {
      session.set("email", result?.user?.email);
      session.set("fullname", result?.user?.fullname);
      session.set("role", result?.user?.role);
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

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  if (session.has("access_token")) {
    return redirect("/home", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  console.log("no tiene uid");
  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function SignInPage({ actionData }: Route.ComponentProps) {
  return (
    <LoginForm actionData={actionData} />
  );
};

