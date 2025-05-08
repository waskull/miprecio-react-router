import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { Route } from "./+types/_dashboard.store";
import { useEffect, useState } from "react";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const data = await fetch("http://localhost:8000/api/v1/store/");
        const json = await data.json();
        return json;
    }catch(e){
        return [];
    }
}

export default function Dashboard({
    loaderData,
}: Route.ComponentProps) {
    const [data, setData] = useState<[]>(loaderData);
    useEffect(() => {
        console.log(loaderData);
    }, []);
    return (
        <h2>store</h2>
    );
}