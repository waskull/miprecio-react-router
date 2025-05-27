import { getSession } from "~/sessions.server";
import type { IUserSession } from "~/interfaces/user";
import type { Route } from "./+types/getUserInfo";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const session = await getSession(request.headers.get('Cookie'));
        const user = session.get('user') as IUserSession;
        console.log(user);
        return user ? user : {message:"La sesión ha expirado"};

    } catch (e) {
        console.log("error: ", e)
        return { fullname: "", email: "", role: "" }
    }
}