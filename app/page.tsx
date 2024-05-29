import { z } from "zod";
import { createClient } from "./supabase/client";
import { ProductSchema } from "./types";
import Products from "./Components/Products";

export default async function Home() {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from("newProductsSchema")
            .select();

        const result = z.array(ProductSchema).safeParse(data);

        if (result.success === true) {
            const validatedData = result.data;

            return <Products products={validatedData} />;
        }
    } catch (error) {}
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
