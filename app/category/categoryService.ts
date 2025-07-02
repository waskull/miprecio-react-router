import apiURL from "~/apiURL";
import type { TaddCategorySchema } from "./categorySchema";

export async function addCategory(formData: TaddCategorySchema, token: string) {
    try {
        const result = await fetch("http://localhost:8000/api/v1/category/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
        });
        const data = await result.json();
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        else return data;
    } catch (e) {
        return e;
    };
}

export async function editCategory(formData: TaddCategorySchema, uid: string, token: string) {
    try {
        const result = await fetch(`${apiURL}/category/${uid}`, {
            method: "PATCH",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        });
        const data = await result.json();
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        else return data;
    } catch (e) {
        return e;
    };
}

export async function deleteCategory(uid: string, token: string) {
    try {
        const result = await fetch(`${apiURL}/category/${uid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        });
        const data = await result.json();
        console.log("Borrando: ", data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        else return data;
    } catch (e) {
        return e;
    };
}