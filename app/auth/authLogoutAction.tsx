import { destroySession, getSession } from "~/sessions.server";
import { logout } from "./authService";
import type { Route } from "./+types/authLogoutAction";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    try {
        const result = await logout(session.get("access_token")!);
        console.log(result);
        return redirect("/", {
            headers: {
                "Set-Cookie": await destroySession(session),
            },
        });
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal al cerrar la sesion");
    }
}