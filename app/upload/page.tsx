"use client";

import { useFormState } from "react-dom";
import { createForm } from "../actions";
import { ZodIssue } from "zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export type Status = "success" | "failed";

function Page() {
    const initialState = {
        status: "",
        msg: "",
        error: null as ZodIssue[] | any,
    };

    const [state, formAction] = useFormState(createForm, initialState);
    console.log(state.error);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.msg);
            redirect("/");
        } else if (state.status === "failed") {
            toast.error(state.msg);
        }
    });

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
                        {state.status === "failed" &&
                            state.error?.some(
                                (error: ZodIssue) => error.path[0] === "name",
                            ) &&
                            state.error?.filter(
                                (error: ZodIssue) => error.path[0] === "name",
                            )[0].message}
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
                        {state.status === "failed" &&
                            state.error?.some(
                                (error: ZodIssue) => error.path[0] === "price",
                            ) &&
                            state.error?.filter(
                                (error: ZodIssue) => error.path[0] === "price",
                            )[0].message}
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
                        {state.status === "failed" &&
                            state.error?.some(
                                (error: ZodIssue) =>
                                    error.path[0] === "description",
                            ) &&
                            state.error?.filter(
                                (error: ZodIssue) =>
                                    error.path[0] === "description",
                            )[0].message}
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
                        {state.status === "failed" &&
                            state.error?.some(
                                (error: ZodIssue) =>
                                    error.path[0] === "imageUrl",
                            ) &&
                            state.error?.filter(
                                (error: ZodIssue) =>
                                    error.path[0] === "imageUrl",
                            )[0].message}
                    </p>
                </label>
                <label htmlFor="contactEmail" className="grid">
                    Contact Email
                    <input
                        className=" input input-bordered input-sm"
                        type="contactEmail"
                        name="contactEmail"
                        id="contactEmail"
                    />
                    <p className=" text-error text-sm font-semibold">
                        {state.status === "failed" &&
                            state.error?.some(
                                (error: ZodIssue) =>
                                    error.path[0] === "contactEmail",
                            ) &&
                            state.error?.filter(
                                (error: ZodIssue) =>
                                    error.path[0] === "contactEmail",
                            )[0].message}
                    </p>
                </label>
                <button type="submit" className="btn btn-accent btn-outline">
                    Create
                </button>
            </form>
        </div>
    );
}

export default Page;
