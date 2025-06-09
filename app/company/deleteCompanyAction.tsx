import { getSession } from "~/sessions.server";
import { deleteCompany } from "./companyService";
import type { Route } from "./+types/deleteCompanyAction";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    try {
        const result = await deleteCompany(id, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al eliminar la compañia", errors: result }
        return "La compañia ha sido eliminada con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}