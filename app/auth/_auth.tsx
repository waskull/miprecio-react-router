import { Outlet, redirect, useLocation, useNavigate } from "react-router";
import { Button, Card, DarkThemeToggle, useThemeMode } from "flowbite-react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { commitSession, destroySession, getSession } from "~/sessions.server";
import type { IUserSession } from "~/interfaces/user";
import { getLoggedUserInfo } from "./authService";
import type { Route } from "./+types/_auth";
/* 
import type { Route } from "./+types/_auth";
import { commitSession, getSession } from "~/sessions.server";
export async function loader({
    request
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const result = await fetch("http://localhost:8000/api/v1/auth/me", { method: "GET", headers: { authorization: `Bearer ${session.get("access_token")}` } });
    const response = await result.json();
    console.log(response);
    return{};
} */

export async function loader({ request, context }: Route.LoaderArgs) {
    const path = context.pathname as string;
    try {
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const accessToken = session.get("access_token");
        const user = session.get('user') as IUserSession;
        if (accessToken && user?.email) {
            console.log("me");
            const userInfo = await getLoggedUserInfo(accessToken);
            console.log(userInfo);
            if (userInfo?.email) {
                /* const response = new Response(JSON.stringify(userInfo), { status: 200, headers: { "Set-Cookie": await commitSession(session) } });
                return response; */
                return redirect("/home");
            }
            else if (userInfo?.error_code === "invalid_token" || userInfo?.error_code === "token_revoked") {
                return redirect("/", {
                    headers: {
                        "Set-Cookie": await destroySession(session),
                    },
                });
            }
        }
        else {
            const redirectTo = path.includes("signup") ? "/auth/signup" : "/auth/signin";
            return redirect(redirectTo, {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }
    } catch (e) {
        return { error: e };
    }
}

export default function AuthLayout({
    loaderData,
}: Route.ComponentProps) {
    const navigate = useNavigate();
    //const [data, setData] = useState(loaderData);
    const { toggleMode, computedMode } = useThemeMode();
    const isDarkMode = computedMode === "dark";

    return (
        <div className="flex flex-col items-center justify-center px-6 lg:h-full lg:gap-y-4 pt-4 pb-4">
            <div className="flex items-center gap-x-1 lg:my-0">
                <img
                    alt="Flowbite logo"
                    src="/favicon.ico"
                    className="mr-3 h-12"
                />
                <span onClick={() => navigate("/")} className="self-center cursor-pointer whitespace-nowrap text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                    MiPrecio
                </span>
                <DarkThemeToggle>                    
                </DarkThemeToggle>
            </div>
            <Card
                horizontal
                imgSrc={"/login.jpg"}
                imgAlt=""
                className="w-full md:max-w-screen-md md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
            >
                <Outlet />
            </Card>
        </div>
    );
}
