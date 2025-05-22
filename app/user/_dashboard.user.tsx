import { Pagination } from "flowbite-react";
import type { Route } from "../user/+types/_dashboard.user";
import { useEffect, useState } from "react";
import type { IUser } from "~/user/user";
import NavBar from "~/components/navbar";
import UserList from "./userList";

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/user/");
        const json = await data.json();
        return json;
    } catch (e) {
        return { error: e };
    }
}

export default function UserPage({
    loaderData,
}: Route.ComponentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    const [data, setData] = useState<IUser[] | any>(loaderData);
    useEffect(() => {
        console.log(loaderData);
    }, []);
    return (
        <div>
            <NavBar />
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                        <div className="overflow-hidden shadow ">
                            <UserList data={data} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Pagination data={data.length | 0} /> */}
            <div className="flex flex-col overflow-x-auto justify-center sticky w-full items-center border-t border-gray-200 bg-white pt-2 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-4">
                <Pagination currentPage={currentPage} totalPages={data.length | 0} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
};

