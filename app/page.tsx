import { z } from "zod";
import { createClient } from "./supabase/client";
import { ProductSchema } from "./types";
import Products from "./Components/Products";
import { notFound, redirect } from "next/navigation";

export default async function Home() {
    const supabase = createClient();

    try {
        //! --- Products ---
        const { data: products, error: productsError } = await supabase
            .from("newProductsSchema")
            .select();

        const resultProducts = z.array(ProductSchema).safeParse(products);
        //! ----------------

        if (resultProducts.success === true) {
            const validatedData = resultProducts.data;
            return <Products products={validatedData} />;
        } else {
            throw new Error(JSON.stringify(resultProducts.error));
        }
    } catch (error) {
        console.log(error);
        notFound();
    }
}
