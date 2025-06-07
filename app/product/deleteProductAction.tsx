import { getSession } from "~/sessions.server";
import { deleteProduct } from "./productService";
import type { Route } from "./+types/deleteProductAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    try {
        const result = await deleteProduct(id, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al eliminar el producto", errors: result }
        return "El producto ha sido eliminado con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}