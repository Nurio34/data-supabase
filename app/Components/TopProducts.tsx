import { z } from "zod";
import { createClient } from "../supabase/client";
import { ProductSchema, ProductType } from "../types";
import Products from "./Products";
import Product from "./Product";
import Link from "next/link";
import Image from "next/image";

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
                            return (
                                <li
                                    key={product.id}
                                    className=" bg-secondary rounded-[1vw] overflow-hidden"
                                >
                                    <Link href={`/${product.id}`}>
                                        <figure className="relative bg-base-300 w-full aspect-square">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/newImages/${product.imageUrl}`}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                alt={product.name}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                            />
                                        </figure>
                                        <div className="py-[1vh] px-[2vw]">
                                            <p className="truncate">
                                                {product.name}
                                            </p>
                                            <p>{product.price} $</p>
                                        </div>
                                    </Link>
                                </li>
                            );
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
