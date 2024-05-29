import React from "react";
import { ProductType } from "../types";
import Product from "./Product";

type Props = {
    products: ProductType[];
};

export default function Products({ products }: Props) {
    return (
        <ul>
            {products?.map((product) => {
                return <Product key={product.id} {...product} />;
            })}
        </ul>
    );
}
