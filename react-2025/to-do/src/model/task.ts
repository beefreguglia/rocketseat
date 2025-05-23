export const TASK_KEY = "@to-do:tasks";

export enum TaskState {
	Creating = "creating",
	Created = "created",
}

export type Task = {
	id: string;
	title: string;
	concluded?: boolean;
	state?: TaskState;
};
