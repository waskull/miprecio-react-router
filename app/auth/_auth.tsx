import { Link, Outlet, redirect, useLocation } from "react-router";
import { Card, DarkThemeToggle, useThemeMode } from "flowbite-react";
import { commitSession, destroySession, getSession } from "~/sessions.server";
import { getLoggedUserInfo } from "./authService";
import type { Route } from "./+types/_auth";
import type { IUserSession } from "~/user/user";

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
    const pathname = useLocation().pathname;
    const { computedMode } = useThemeMode();

    return (
        <div className="flex flex-col items-center justify-center px-6 lg:h-full lg:gap-y-4 pt-4 pb-4">
            <div className="flex items-center gap-x-1 lg:my-0">
                <img
                    alt="Flowbite logo"
                    src="/favicon.ico"
                    className="mr-3 h-12"
                />
                <Link to="/" className="self-center cursor-pointer whitespace-nowrap text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                    MiPrecio
                </Link>
                <DarkThemeToggle>                    
                </DarkThemeToggle>
            </div>
            <Card
                horizontal
                imgSrc={pathname === "/auth/signup" ? "/signup.jpg" : "/signin.jpg"}
                imgAlt=""
                className="w-full md:max-w-screen-md md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
            >
                <Outlet />
            </Card>
        </div>
    );
}
