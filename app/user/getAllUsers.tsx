import { data } from "react-router";
import type { Route } from "./+types/getAllUsers";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    let limit: string = "10";
    let offset: string = "0";
    if (searchParams.has("limit") && searchParams.has("offset")) {
        limit = searchParams.get("limit") || "10";
        offset = searchParams.get("offset") || "0";
    }
    const res = await fetch(`http://localhost:8000/api/v1/user/?limit=${limit}&offset=${offset}`, {
        headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return data(json, { headers: { "Content-Type": "application/json" } });
}