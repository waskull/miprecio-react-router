import { getSession } from "~/sessions.server";
import type { TaddCategorySchema } from "./categorySchema";
import { editCategory } from "./categoryService";
import type { Route } from "./+types/editCategoryAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    const formData = await request.formData();
    console.log(formData);
    try {
        const form = Object.fromEntries(formData) as TaddCategorySchema;
        const data = await editCategory(form, id, session.get("access_token") ?? "");
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return data;
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}