import { z } from "zod";
import { createClient } from "../supabase/client";
import { ProductSchema, ProductType } from "../types";
import Products from "./Products";
import Product from "./Product";

async function TopProducts() {
    const supabase = createClient();

    try {
        const { data: topProducts, error: topProductsError } = await supabase
            .from("newProductsSchema")
            .select()
            .eq("boost", true);

        const resultTopProducts = z.array(ProductSchema).safeParse(topProducts);

        if (resultTopProducts.success === true) {
            const validatedData = resultTopProducts.data;

            return (
                <article className=" flex flex-col xl:flex-row justify-center items-center gap-[4vw] my-[2vh] mx-[4vw] py-[2vh] px-[4vw] bg-accent-content">
                    <div className="prose grid place-content-center text-center text-accent">
                        <h2 className="text-accent">Top Produsts</h2>
                        <p>You can pay to boost your products here</p>
                    </div>
                    <ul className="grow grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[2vw]">
                        {validatedData?.map((product) => {
                            return <Product key={product.id} {...product} />;
                        })}
                    </ul>
                </article>
            );
        } else {
            throw new Error(JSON.stringify(resultTopProducts.error));
        }
    } catch (error) {}
}

export default TopProducts;
