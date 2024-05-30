"use client";
import { useEffect, useState } from "react";
import Form from "./Form";
import TasksList from "./TasksList";
import ToggleTasksBtn from "./ToggleTasksBtn";
import { AnimatePresence, motion } from "framer-motion";

function Tasks() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newState, setNewState] = useState({
        status: "",
        msg: "",
        error: null as any,
    });

    const toggleTasks = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setNewState({
            status: "",
            msg: "",
            error: null,
        });
    }, [isOpen]);

    return (
        <div className="relative">
            <ToggleTasksBtn toggleTasks={toggleTasks} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute z-10  py-[2vh] px-[4vw] rounded-md bg-base-100 shadow-lg shadow-primary"
                        initial={{ x: -100, y: -30, opacity: 0 }}
                        animate={{ y: 30, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                    >
                        <Form newState={newState} setNewState={setNewState} />
                        <TasksList
                            newState={newState}
                            setNewState={setNewState}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Tasks;
