import React from "react";
import { ProductType } from "../types";
import Product from "./Product";
import TopProducts from "./TopProducts";

type Props = {
    products: ProductType[];
};

export default function Products(props: Props) {
    const { products } = props;

    return (
        <section className=" space-y-[2vh] ">
            <TopProducts />

            <article>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[2vw]">
                    {products?.map((product) => {
                        return <Product key={product.id} {...product} />;
                    })}
                </ul>
            </article>
        </section>
    );
}
