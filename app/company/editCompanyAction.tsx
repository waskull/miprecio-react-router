import { getSession } from "~/sessions.server";
import type { TaddCompanySchema } from "./companySchema";
import { editCompany } from "./companyService";
import type { Route } from "./+types/editCompanyAction";
export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    const formData = await request.formData();
    console.log(formData);
    try {
        const form = Object.fromEntries(formData) as TaddCompanySchema;
        const data = await editCompany(form, id, session.get("access_token") ?? "");
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return { message: "Categoria actualizada con exito", success: true };
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}