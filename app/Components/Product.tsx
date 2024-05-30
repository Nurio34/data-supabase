import React from "react";
import { ProductType } from "../types";
import Image from "next/image";
import Link from "next/link";

function Product(props: ProductType) {
    const { id, name, imageUrl, price } = props;

    return (
        <li className=" bg-secondary rounded-[1vw] overflow-hidden">
            <Link href={`/${id}`}>
                <figure className="relative bg-base-300 w-full aspect-square">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/newImages/${imageUrl}`}
                        layout="fill"
                        style={{ objectFit: "cover" }}
                        alt={name}
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
