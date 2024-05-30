"use server";

import { FormSchema } from "../types";
import { createClient } from "../supabase/client";
import { TaskSchema } from "../Components/Tasks/types";
import { revalidatePath } from "next/cache";
import { ZodIssue } from "zod";

export const createForm = async (
    prevState: {
        status: string;
        msg: string;
        error: ZodIssue[] | null;
    },
    formData: any,
) => {
    const name = formData.get("name");
    const price = Number(formData.get("price"));
    const description = formData.get("description");
    const imageUrl = formData.get("image");
    const contactEmail = formData.get("contactEmail");

    const unvalidatedFormData = {
        name,
        price,
        description,
        imageUrl,
        contactEmail,
    };
    console.log(imageUrl);

    const ZodValidation = FormSchema.safeParse(unvalidatedFormData);

    if (!ZodValidation.success) {
        //! --- Error with form inputs ---
        return {
            status: "failed",
            msg: "Something wrong with form inputs",
            error: ZodValidation.error.errors,
        };
    } else {
        //** --- Zod suceess --- */

        //** --- Send image to Supabase Storage --- */
        try {
            const imageName = Date.now() + "_" + imageUrl.name;
            const supabase = createClient();
            const { data, error } = await supabase.storage
                .from("newImages")
                .upload(imageName, imageUrl);

            if (error) {
                //! --- Error while Uploading image to Supabase Storage ---
                return {
                    status: "failed",
                    msg: "Something went wrong while uploading image to Supabase Storage",
                    error,
                };
            } else {
                //** --- Supabase uploading to Storage success */

                //** --- Add data to Supabase Table --- */
                try {
                    const { data, error } = await supabase
                        .from("newProductsSchema")
                        .insert({ ...ZodValidation.data, imageUrl: imageName });

                    if (error) {
                        //! --- Error while Inserting data to Supabase Table
                        return {
                            status: "failed",
                            msg: "Something went wrong while Inserting data to Supabase Table",
                            error,
                        };
                    } else {
                        //** Supabase data Insert to Table success */
                        return {
                            status: "success",
                            msg: "Product Created Succesfully",
                            error: null,
                        };
                    }
                } catch (error) {
                    return {
                        status: "failed",
                        msg: "Unexpected error while Inserting data to Supabase Table",
                        error,
                    };
                }
            }
        } catch (error) {
            return {
                status: "failed",
                msg: "Unexpected error while uploading image to Supabase Storage ",
                error,
            };
        }
    }
};

export const createTask = async (preveSate: any, formData: any) => {
    const task = formData.get("task");
    const unvalidatedFormData = {
        task,
    };

    const ZodValidation = TaskSchema.safeParse(unvalidatedFormData);

    if (ZodValidation.error) {
        //! --- Error while createing Task ---
        return {
            status: "failed",
            msg: "Something went wrong while creating task",
            error: ZodValidation.error.errors,
        };
    } else {
        //** Creating Task success */
        //** Insert data to Supabase Table */
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("tasks")
                .insert(ZodValidation.data);

            if (error) {
                //! Error while Insert data to Supabase -tasks- Table
                return {
                    status: "failed",
                    msg: "Something went wrong while Inserting data to Supabase Table",
                    error,
                };
            } else {
                //** Data Inserting to Supabase -tasks- Table success */
                revalidatePath("/");
                revalidatePath("/upload");
                return {
                    status: "success",
                    msg: "Task Created successfully",
                    error: null,
                };
            }
        } catch (error) {
            return {
                status: "failed",
                msg: "Unexpected error while Inserting data to Supabase Table",
                error,
            };
        }
    }
};
