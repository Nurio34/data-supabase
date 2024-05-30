import { z } from "zod";
import { createClient } from "./supabase/client";
import { ProductSchema } from "./types";
import Products from "./Components/Products";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

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

// import { z } from "zod";
// import { createClient } from "./supabase/client";
// import { ProductSchema } from "./types";
// import Products from "./Components/Products";

// export default function Home() {
//     const supabase = createClient();

//     const fetchProducts = async () => {
//         try {
//             const { data, error } = await supabase.from("e-commerce").select();
//             console.log(data);

//             const result = z.array(ProductSchema).safeParse(data);

//             if (result.success === true) {
//                 const validatedData = result.data;

//                 return <Products products={validatedData} />;
//             }
//         } catch (error) {}
//     };

//     fetchProducts();
// }
