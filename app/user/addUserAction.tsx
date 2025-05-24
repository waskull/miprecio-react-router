import { getSession } from "~/sessions.server";
import type { TaddUserSchema } from "./userSchema";
import { addUser } from "./userService";

export async function action({ request }: any) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    try {
        const data = Object.fromEntries(formData) as TaddUserSchema;
        const result = await addUser(data, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return {error:"Algo salio mal al agregar el usuario", errors: result}
        return "El usuario ha sido creado con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
    console.log("action");
}