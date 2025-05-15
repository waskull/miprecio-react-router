import { Outlet } from "react-router";
import { useEffect, type FC, type PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { MdFacebook } from "react-icons/md";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Footer, FooterLink, FooterLinkGroup, useThemeMode, type ThemeMode } from "flowbite-react";

interface NavbarSidebarLayoutProps {
    isFooter?: boolean;
}

const DashboardLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
    function ({ children, isFooter = false }) {
        return (
            <div className="">
                 <div aria-hidden="true" className="absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg-gradient-to-b from-blue-500 to-teal-600  blur-3xl mx-auto scale-y-150 opacity-75">

                            </div>
                {/* <Navbar /> */}
                <div className="flex items-start">
                    <Sidebar />
                    <MainContent isFooter={isFooter}>
                        {/* min-h-screen abajo */}
                        <div className="relative">
                            <div aria-hidden="true" className="absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg-gradient-to-b from-blue-500 to-teal-600  blur-3xl mx-auto scale-y-150 opacity-75">

                            </div>
                         <Outlet />
                        </div>
                    </MainContent>
                </div>
            </div>
        );
    };

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
    children,
    isFooter,
}) {
    const {setMode, computedMode} = useThemeMode();
    let theme:string | null = null;    
    const lightMode: ThemeMode = "light";
    const darkMode: ThemeMode = "dark";
    useEffect(() => {        
    theme = localStorage.getItem('flowbite-theme-mode');
    if (theme  === lightMode || theme === darkMode) setMode(theme);
    else setMode(darkMode);
    }, [])
    return (
        <main className="relative size-full overflow-y-auto md:ml-64  mt-0">
            {children}
            {isFooter && (
                <div className="mx-4 mt-4">
                    <MainContentFooter />
                </div>
            )}
        </main>
    );
};

const MainContentFooter: FC = function () {
    return (
        <>
            <Footer container>
                <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
                    <FooterLinkGroup>
                        <FooterLink href="#" className="mr-3 mb-3 lg:mb-0">
                            Terms and conditions
                        </FooterLink>
                        <FooterLink href="#" className="mr-3 mb-3 lg:mb-0">
                            Privacy Policy
                        </FooterLink>
                        <FooterLink href="#" className="mr-3">
                            Licensing
                        </FooterLink>
                        <FooterLink href="#" className="mr-3">
                            Cookie Policy
                        </FooterLink>
                        <FooterLink href="#">Contact</FooterLink>
                    </FooterLinkGroup>
                    <FooterLinkGroup>
                        <div className="flex gap-x-1">
                            <FooterLink
                                href="#"
                                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
                            >
                                <MdFacebook className="text-lg" />
                            </FooterLink>
                            <FooterLink
                                href="#"
                                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
                            >
                                <FaInstagram className="text-lg" />
                            </FooterLink>
                            <FooterLink
                                href="#"
                                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
                            >
                                <FaTwitter className="text-lg" />
                            </FooterLink>
                            <FooterLink
                                href="#"
                                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
                            >
                                <FaGithub className="text-lg" />
                            </FooterLink>
                            <FooterLink
                                href="#"
                                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
                            >
                                <FaDribbble className="text-lg" />
                            </FooterLink>
                        </div>
                    </FooterLinkGroup>
                </div>
            </Footer>
            <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
                &copy; 2025-2025 MiPrecio.com. Todos los derechos reservados.
            </p>
        </>
    );
};

export function ASD() {
    return (
        <Outlet ></Outlet>
    );
}

export default DashboardLayout;