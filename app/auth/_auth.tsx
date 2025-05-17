import { Outlet, useNavigate } from "react-router";
import { Button, Card, DarkThemeToggle, useThemeMode } from "flowbite-react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
export default function AuthLayout() {
    const navigate = useNavigate();
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
                <span onClick={() => navigate("/")} className="self-center whitespace-nowrap text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                    MiPrecio
                </span>
                <Button size="sm" className="ring-0  ring-transparent" color="transparent" onClick={() => {
                    toggleMode();
                }}>
                    {isDarkMode ? <MdOutlineDarkMode className="text-md text-gray-400" /> : <MdOutlineLightMode className="text-md text-gray-700" />}
                </Button>
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
