import type { TaddUserSchema, TeditUserSchema } from "./userSchema";

export async function addUser(formData: TaddUserSchema, token:string) {
    try {
        const result = await fetch("http://localhost:8000/api/v1/user/", {
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

export async function editUser(formData: TeditUserSchema, uid: string) {
    try {
        const result = await fetch(`http://localhost:8000/api/v1/user/${uid}`, {
            method: "PATCH",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" }
        });
        const data = await result.json();
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        else return data;
    } catch (e) {
        return e;
    };
}