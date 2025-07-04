import { getSession } from "~/sessions.server";
import { deleteUser } from "./userService";
import type { Route } from "./+types/deleteUserAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    try {
        const result = await deleteUser(id, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al eliminar el usuario", errors: result }
        return "El usuario ha sido eliminado con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}