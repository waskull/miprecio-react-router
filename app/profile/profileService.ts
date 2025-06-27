import apiURL from "~/apiURL";
import type { TeditUserPasswordSchema, TprofileSchema } from "./profileSchema";

export async function editProfile(formData: TprofileSchema, token: string) {
    try {
        const result = await fetch(`${apiURL}/profile`, {
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

export async function editPassword(formData: TeditUserPasswordSchema, token: string) {
    try {
        const result = await fetch(`${apiURL}/user/password/`, {
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