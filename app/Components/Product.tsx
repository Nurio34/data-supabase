import React from "react";
import { ProductType } from "../types";
import Image from "next/image";

function Product(props: ProductType) {
    const {
        id,
        created_at,
        name,
        description,
        imageUrl,
        price,
        boost,
        contactEmail,
    } = props;

    console.log(imageUrl);

    return (
        <li>
            <Image src={imageUrl} width={220} height={220} alt={name} />
        </li>
    );
}

export default Product;
