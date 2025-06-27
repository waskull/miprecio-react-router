import { Pagination } from "flowbite-react";
import type { Route } from "../user/+types/_dashboard.user";
import { useEffect, useState } from "react";
import type { IUser } from "~/user/user";
import UserList from "./userList";
import { getSession } from "~/sessions.server";
import type { TaddUserSchema } from "./userSchema";
import { addUser } from "./userService";
import { data, type MetaFunction } from "react-router";
import apiURL from "~/apiURL";

export const meta: MetaFunction = () => {
  return [
    { title: "Usuarios" },
    { name: "description", content: "MiPrecio" },
  ];
};

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    console.log(formData);
    try {
        const data = Object.fromEntries(formData) as TaddUserSchema;
        const result = await addUser(data, session.get("access_token") ?? "");
        console.log(result);
        if (!result?.message) return { error: "Algo salio mal al agregar el usuario", errors: result }
        return "El usuario ha sido creado con exito";
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    let limit: string = "100";
    let offset: string = "0";
    if (searchParams.has("limit") && searchParams.has("offset")) {
        limit = searchParams.get("limit") || "100";
        offset = searchParams.get("offset") || "0";
    }
    const res = await fetch(`${apiURL}/user/?limit=${limit}&offset=${offset}`, {
        headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    console.log(json);
    return data(json, { headers: { "Content-Type": "application/json" } });
}




export default function UserPage({  }: Route.ComponentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [users, setUsers] = useState<{ total: number, users: IUser[] }>({ total: 1, users: [] });
    async function fetchData() {
        const offset: number = (currentPage - 1) * 10;
        try {
            const data = await fetch(`/users/all/?limit=${10}&offset=${offset}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await data.json();
            setUsers(json);
        }
        catch (e: any) {
            console.log("Error: ", e);
            setUsers({ total: 1, users: [] });
        }
    }
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 shadow ">
                            {users?.users?.length! > 0 && <UserList data={users.users} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-x-auto justify-center fixed bottom-0 w-full items-center border border-gray-200 bg-white  dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-3.5">
                <Pagination nextLabel="Siguiente" previousLabel="Anterior" currentPage={currentPage} totalPages={users.total || 1} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
};

