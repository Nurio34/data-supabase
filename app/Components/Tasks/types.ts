import { z } from "zod";

export const TaskSchema = z.object({
    task: z.string().min(5, "Task min 5 chars"),
});

type ZodTask = z.infer<typeof TaskSchema>;

export type TaskType = ZodTask & {
    id: string;
    created_at: string;
};
