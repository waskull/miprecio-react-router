import { Outlet, useNavigate } from "react-router";
import { Card, DarkThemeToggle } from "flowbite-react";

export default function AuthLayout() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center px-6 lg:h-full lg:gap-y-6 pb-4">
            <div className="self-end pt-2">
                <DarkThemeToggle />
            </div>
            <div className="flex items-center gap-x-1 lg:my-0">
                <img
                    alt="Flowbite logo"
                    src="/favicon.ico"
                    className="mr-3 h-12"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                    MiPrecio
                </span>
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
