"use server";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "../supabase/client";
import { FormSchema } from "../types";
import { cookies } from "next/headers";

export const createForm = async (
    prevState: { msg: any; status: any },
    formData: any,
) => {
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const description = formData.get("description");
    const image = formData.get("image");
    const email = formData.get("email");

    const FormData = { name, price, description, image, email };

    const result = FormSchema.safeParse(FormData);

    if (!result.success) {
        return { status: "failed", msg: result.error.errors };
    } else {
        try {
            const supabase = createClient();
            const imageName = Date.now() + "_" + image.name;

            const { data: imageData, error } = await supabase.storage
                .from("newImages")
                .upload(imageName, image, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) {
                console.log(error);

                return {
                    status: "failedToUploadImage",
                    msg: "Failed to Upload Image",
                };
            } else {
                const path = imageData.path;

                const supabase = createClient();

                const { error } = await supabase
                    .from("newProductsSchema")
                    .insert({
                        name,
                        price,
                        description,
                        contactEmail: email,
                        imageUrl: path,
                    });
                console.log({
                    name,
                    price,
                    description,
                    contactEmail: email,
                    imageUrl: path,
                });
            }

            return { status: "success", msg: "Successfully created..." };
        } catch (error) {
            console.log(error);
        }
    }
};
