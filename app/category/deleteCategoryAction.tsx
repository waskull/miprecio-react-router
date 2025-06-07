import { getSession } from "~/sessions.server";
import { deleteCategory } from "./categoryService";
import type { Route } from "./+types/deleteCategoryAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    try {
        const result = await deleteCategory(id, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al eliminar la categoria", errors: result }
        return "La categoria ha sido eliminada con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}