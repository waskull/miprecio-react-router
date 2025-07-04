import { getSession } from "~/sessions.server";
import type { TaddProductSchema } from "./productSchema";
import { editProduct } from "./productService";
import type { Route } from "./+types/editProductAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    const formData = await request.formData();
    console.log(formData);
    try {
        const form = Object.fromEntries(formData) as TaddProductSchema;
        const data = await editProduct(form, id, session.get("access_token") ?? "");
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return { message: "Producto actualizado con exito", success: true };
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}