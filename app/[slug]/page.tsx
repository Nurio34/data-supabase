import React from "react";
import { createClient } from "../supabase/client";
import { ProductSchema, ProductType } from "../types";
import { notFound } from "next/navigation";
import { z } from "zod";
import Image from "next/image";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const supabase = createClient();
    const { data: products, error }: any = await supabase
        .from("newProductsSchema")
        .select();

    if (products.length === 0) {
        return [];
    }

    return products.map((product: ProductType) => {
        return { slug: product.id };
    });
}

async function Product(props: Props) {
    const { params } = props;
    const id = params.slug;

    const supabase = createClient();

    try {
        const { data: product, error }: any = await supabase
            .from("newProductsSchema")
            .select()
            .match({ id })
            .single();

        const result = ProductSchema.safeParse(product);

        if (result.success === true) {
            const validatedData = result.data;
            const { name, description, imageUrl, price, contactEmail, boost } =
                validatedData;
            console.log(imageUrl);

            return (
                <section className="  lg:my-[4vh] lg:mx-[20vw] space-y-[2vh]">
                    <div className="prose prose-headings:m-0 max-w-none flex justify-between items-center">
                        <h2 className="">{name}</h2>
                        <a
                            href={`mailto:${contactEmail}`}
                            className="btn btn-secondary text-secondary-content"
                        >
                            Contact the Seller
                        </a>
                    </div>
                    <figure className=" space-y-[2vh]">
                        <div className="flex justify-between gap-[2vw]">
                            <div className=" relative w-1/2 aspect-square bg-base-200 ">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/newImages/${imageUrl}`}
                                    alt={name}
                                    layout="fill"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className=" grow py-[2vh] px-[4vw] bg-base-300">
                                <p>{price} $</p>
                                <p>Premium : {boost ? "Yes" : "No"}</p>
                            </div>
                        </div>
                        <figcaption className=" text-neutral">
                            {description}
                        </figcaption>
                    </figure>
                </section>
            );
        } else {
            throw new Error(JSON.stringify(result.error));
        }
    } catch (error) {
        console.log(error);
        notFound();
    }
}

export default Product;
