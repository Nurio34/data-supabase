import { createClient } from "@/app/supabase/client";
import Task from "./Task";
import { useEffect, useState } from "react";
import { TaskType } from "./types";

function TasksList({ newState, setNewState }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [tasks, setTasks] = useState<[]>([]);
    const [error, setError] = useState<string>("");

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const supabase = createClient();
            const { data, error }: any = await supabase.from("tasks").select();

            if (error) {
                //! --- Error while Fetchin data from Supabase -tasks- Table
                setError(error.message);
            } else {
                //** Fetching data from Supabase -tasks- Table */
                setTasks(data);
            }
        } catch (error) {
            setError("Unexpected error occured...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [newState]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (tasks.length === 0) {
        return <p>No tasks to show...</p>;
    }
    return (
        <ul className="grid py-1 gap-1">
            {tasks.map((task: TaskType) => {
                return (
                    <Task key={task.id} {...task} setNewState={setNewState} />
                );
            })}
        </ul>
    );
}

export default TasksList;
