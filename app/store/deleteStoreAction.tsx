import { getSession } from "~/sessions.server";
import { deleteProduct } from "./storeService";
import type { Route } from "./+types/deleteStoreAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    const product_uid = params.product_uid;
    try {
        const result = await deleteProduct(id, product_uid, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al eliminar el producto de la tienda", errors: result }
        return { message: "El producto ha sido eliminado de la tienda con exito" };
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}