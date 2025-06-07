import type { TaddProductSchema } from "./productSchema";

export async function addProduct(formData: TaddProductSchema, token: string) {
    try {
        const result = await fetch("http://localhost:8000/api/v1/product/", {
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

export async function editProduct(formData: TaddProductSchema, uid: string, token: string) {
    try {
        const result = await fetch(`http://localhost:8000/api/v1/product/${uid}`, {
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

export async function deleteProduct(uid: string, token: string) {
    try {
        const result = await fetch(`http://localhost:8000/api/v1/product/${uid}`, {
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