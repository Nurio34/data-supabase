"use client";

import { useFormStatus } from "react-dom";

function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="join-item btn btn-sm md:btn-md btn-accent"
        >
            {pending ? "Creating" : "Create"}
        </button>
    );
}

export default SubmitBtn;
