import { createTask } from "@/app/actions";
import SubmitBtn from "./SubmitBtn";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

function Form({ newState, setNewState }: any) {
    const Form = useRef<HTMLFormElement | null>(null);
    const TaskInput = useRef<HTMLInputElement>(null);

    const [state, formAction] = useFormState(createTask, newState);

    useEffect(() => {
        if (Form.current !== null) {
            Form.current.reset();
        }
        if (TaskInput.current !== null) {
            TaskInput.current.focus();
        }

        setNewState(state);

        if (state.msg) {
            toast.success(state.msg);
        }
    }, [state]);

    return (
        <form action={formAction} className="join" ref={Form}>
            <label htmlFor="task">
                <input
                    type="text"
                    name="task"
                    id="task"
                    placeholder="Enter task..."
                    className=" join-item input input-sm md:input-md input-bordered"
                    ref={TaskInput}
                    autoComplete="off"
                />
            </label>
            <SubmitBtn />
        </form>
    );
}

export default Form;
