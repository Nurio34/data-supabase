"use client";

type Props = {
    toggleTasks: () => void;
};

function ToggleTasksBtn(props: Props) {
    const { toggleTasks } = props;
    return (
        <button
            className="btn btn-primary btn-sm md:btn-md"
            onClick={toggleTasks}
        >
            Tasks
        </button>
    );
}

export default ToggleTasksBtn;
