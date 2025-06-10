import { getSession } from "~/sessions.server";
import type { TaddProductStoreSchema } from "./storeSchema";
import { editProduct } from "./storeService";
import type { Route } from "./+types/editStoreAction";
import { redirect } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const id = params.id
    const formData = await request.formData();
    try {
        const productData = {
        product_uid: formData.get("product_uid") as string,
        discount: parseInt(formData.get("discount") as string),
        price: parseFloat(formData.get("price") as string),
        wholesale_price: parseFloat(formData.get("wholesale_price") as string),
        company_uid : params.id as string
    }
        //const form = Object.fromEntries(formData) as TaddProductStoreSchema;
        const data = await editProduct(productData, productData.company_uid, session.get("access_token") ?? "");
        console.log(data);
        if (data?.error_code) return { error: true, message: data.message, error_code: data.error_code };
        else if (Array.isArray(data?.detail)) { return data?.detail.map((item: any) => item.msg) }
        console.log(data);
        return { message: "Producto actualizado con exito", success: true };
        //return redirect(`/store/${params.id}`);
    } catch (e) {
        console.log("error: ", e)
        throw new Error("Algo salio mal");
    }
}