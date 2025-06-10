import type { TaddProductStoreSchema } from "./storeSchema";

export async function addStoreProduct(formData: TaddProductStoreSchema, token: string) {
    try {
        const result = await fetch("http://localhost:8000/api/v1/store/", {
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

export async function editProduct(formData: TaddProductStoreSchema, uid: string, token: string) {
    try {
        const result = await fetch(`http://localhost:8000/api/v1/store/${uid}`, {
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

export async function deleteProduct(uid: string, product_uid: string, token: string) {
    try {
        const result = await fetch(`http://localhost:8000/api/v1/store/${uid}`, {
            method: "DELETE",
            body: JSON.stringify({ product_uid }),
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