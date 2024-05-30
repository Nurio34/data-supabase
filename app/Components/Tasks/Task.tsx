import { createClient } from "@/app/supabase/client";
import { revalidatePath } from "next/cache";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
    task: string;
    id: string;
    setNewState: any;
};

function Task(props: Props) {
    const { task, id, setNewState } = props;
    const TaskInput = useRef<HTMLInputElement>(null);
    const [currentTask, setCurrentTask] = useState<string>(task);

    const startEditing = () => {
        if (TaskInput.current) {
            TaskInput.current.readOnly = false;
            TaskInput.current.focus();
        }
    };

    async function editTask(e: React.KeyboardEvent) {
        if (e.code === "Enter") {
            try {
                const supabase = createClient();

                const { error } = await supabase
                    .from("tasks")
                    .update({ task: currentTask })
                    .eq("id", id);

                if (error) {
                    //! --- Error while updating task
                    setNewState({
                        status: "failed",
                        msg: "Something went wrong while updating task",
                        error: error.message,
                    });
                    return;
                } else {
                    //** Task Deleted successfully */
                    if (TaskInput.current) {
                        TaskInput.current.readOnly = true;
                        setNewState({
                            status: "success",
                            msg: "Task uptaded successfully",
                            error: null,
                        });

                        toast.success("Task uptaded successfully");

                        return;
                    }
                }
            } catch (error) {
                setNewState({
                    status: "failed",
                    msg: "Unexpected error while updating task",
                    error,
                });
                return;
            }
        }
    }

    async function deleteTask() {
        const supabase = createClient();

        const { error } = await supabase.from("tasks").delete().eq("id", id);

        if (error) {
            //! --- Error while Deleting Task ---
            setNewState({
                status: "failed",
                msg: "Something went wrong while deleting task",
                error: error.message,
            });
            return;
        } else {
            //** Task Deleted successfully */
            setNewState({
                status: "success",
                msg: "Task deleted successfully",
                error: null,
            });
            toast.success("Task deleted successfully");
            return;
        }
    }

    return (
        <li
            className="px-2 bg-base-100 rounded-md 
            flex justify-start items-center gap-2 
        "
        >
            <input
                type="text"
                name="task"
                id="task"
                className=" grow truncate max-w-[211.53px] outline-none capitalize input input-sm "
                title={task}
                defaultValue={currentTask}
                readOnly={true}
                ref={TaskInput}
                onChange={(e) => setCurrentTask(e.target.value)}
                onKeyDown={(e) => editTask(e)}
            />
            <button type="button" onClick={startEditing}>
                <CiEdit className=" ml-auto bg-info text-info-content text-2xl p-1 rounded-md" />
            </button>
            <button type="button" onClick={deleteTask}>
                <MdDeleteOutline className="bg-error text-error-content text-2xl p-1 rounded-md" />
            </button>
        </li>
    );
}

export default Task;
