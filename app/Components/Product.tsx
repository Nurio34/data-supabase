import React from "react";
import { ProductType } from "../types";
import Image from "next/image";
import Link from "next/link";

function Product(props: ProductType) {
    const { id, name, imageUrl, price } = props;
    console.log(imageUrl);

    return (
        <li className=" bg-secondary rounded-[1vw] overflow-hidden">
            <Link href={`/${id}`}>
                <figure className="relative bg-base-300 w-full aspect-square">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/newImages/${imageUrl}`}
                        fill
                        style={{ objectFit: "cover" }}
                        alt={name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </figure>
                <div className="py-[1vh] px-[2vw]">
                    <p className="truncate">{name}</p>
                    <p>{price} $</p>
                </div>
            </Link>
        </li>
    );
}

export default Product;
