import { getSession } from "~/sessions.server";
import type { IUserSession } from "~/interfaces/user";
import type { Route } from "./+types/addUserAction";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const session = await getSession(request.headers.get('Cookie'));
        const user = session.get('user') as IUserSession;
        return user ? user : "No estas autenticado";

    } catch (e) {
        console.log("error: ", e)
        return { fullname: "", email: "", role: "" }
    }
}