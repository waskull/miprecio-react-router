import apiURL from "~/apiURL";
import type { TpasswordRecoverSchema, TsignInSchema } from "./authSchemas";

export async function signIn(formData: TsignInSchema) {
    try {
        const result = await fetch(`${apiURL}/auth/login`, { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } });
        const data = await result.json();
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return data;
    } catch (e) {
        return e;
    };
}

export async function getLoggedUserInfo(access_token: string) {
    try {
        const result = await fetch(`${apiURL}/auth/me`, { method: "GET", headers: { "Content-Type": "application/json", authorization: `Bearer ${access_token}` } });
        const data = await result.json();
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return data;
    } catch (e) {
        return e;
    };
}

export async function passwordReset(email: string) {
    try {
        const result = await fetch(`${apiURL}/auth/password-reset-request`, { method: "POST", body: JSON.stringify({ email }), headers: { "Content-Type": "application/json" } });
        const data = await result.json();
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return data;
    } catch (e) {
        return e;
    };
}

export async function sendToken(token: string) {
    try {
        const result = await fetch(`${apiURL}/password-reset-confirm/${token}`, { method: "POST", headers: { "Content-Type": "application/json" } });
        const data = await result.json();
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return data;
    } catch (e) {
        return e;
    };
}

export async function logout(access_token: string) {
    try {
        const result = await fetch(`http://localhost:8000/api/v1/auth/logout`, { method: "GET", headers: { "Content-Type": "application/json", authorization: `Bearer ${access_token}` } });
        const data = await result.json();
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        return data;
    } catch (e) {
        return e;
    };
}