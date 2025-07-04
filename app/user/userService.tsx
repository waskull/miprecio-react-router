import apiURL from "~/apiURL";
import type { TaddUserSchema, TeditUserSchema } from "./userSchema";

export async function addUser(formData: TaddUserSchema, token: string) {
    try {
        const result = await fetch(`${apiURL}/user/`, {
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

export async function editUser(formData: TeditUserSchema, uid: string, token: string) {
    try {
        const result = await fetch(`${apiURL}/user/${uid}`, {
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

export async function deleteUser(uid: string, token: string) {
    try {
        const result = await fetch(`${apiURL}/user/${uid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        });
        const data = await result.json();
        console.log("DELETE: ", data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        else return data;
    } catch (e) {
        return e;
    };
}