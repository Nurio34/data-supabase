"use client";

import { useFormState } from "react-dom";
import { createForm } from "../actions";
import { useEffect, useState } from "react";
import { ZodIssue } from "zod";

function page() {
    const [message, setMessage] = useState<any>("");
    const [errors, setErrors] = useState<any>([]);

    const initialState: any = {
        status: "",
        msg: "",
    };

    const [state, formAction] = useFormState(createForm, initialState);

    useEffect(() => {
        if (state.status === "failed") {
            setErrors(
                state.msg.map((error: any) => {
                    return { name: error.path[0], message: error.message };
                }),
            );
        } else {
            setMessage(state.msg);
            setErrors([]);
        }
    }, [state]);

    return (
        <div className="flex flex-col lg:flex-row gap-[1vh] lg:gap-[4vw] justify-center items-center lg:items-start ">
            <div className="prose w-[27ch] py-[2vh] px-[4vw]">
                <h2>Sell Your Item</h2>
                <p>Enter details in this form to start selling your item</p>
            </div>
            <form action={formAction} className=" max-w-xl grid gap-[1vh]">
                <label htmlFor="name" className="grid">
                    Name
                    <input
                        className=" input input-bordered input-sm"
                        type="text"
                        name="name"
                        id="name"
                    />
                    <p className=" text-error text-sm font-semibold">
                        {
                            errors.filter(
                                (error: any) => error.name === "name",
                            )[0]?.message
                        }
                    </p>
                </label>
                <label htmlFor="price" className="grid">
                    Price
                    <input
                        className=" input input-bordered input-sm"
                        type="number"
                        name="price"
                        id="price"
                    />
                    <p className=" text-error text-sm font-semibold">
                        {
                            errors.filter(
                                (error: any) => error.name === "price",
                            )[0]?.message
                        }
                    </p>
                </label>
                <label htmlFor="description" className="grid">
                    Description
                    <input
                        className=" input input-bordered input-sm"
                        type="text"
                        name="description"
                        id="description"
                    />
                    <p className=" text-error text-sm font-semibold">
                        {
                            errors.filter(
                                (error: any) => error.name === "description",
                            )[0]?.message
                        }
                    </p>
                </label>
                <label htmlFor="image" className="grid">
                    Image
                    <input
                        className=" input input-bordered input-sm"
                        type="file"
                        name="image"
                        id="image"
                    />
                    <p className=" text-error text-sm font-semibold">
                        {
                            errors.filter(
                                (error: any) => error.name === "image",
                            )[0]?.message
                        }
                    </p>
                </label>
                <label htmlFor="email" className="grid">
                    Contact Email
                    <input
                        className=" input input-bordered input-sm"
                        type="email"
                        name="email"
                        id="email"
                    />
                    <p className=" text-error text-sm font-semibold">
                        {
                            errors.filter(
                                (error: any) => error.name === "email",
                            )[0]?.message
                        }
                    </p>
                </label>
                <button type="submit" className="btn btn-accent btn-outline">
                    Create
                </button>
            </form>
        </div>
    );
}

export default page;
