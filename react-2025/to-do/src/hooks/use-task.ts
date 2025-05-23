import useLocalStorage from "use-local-storage";
import { type Task, TASK_KEY, TaskState } from "../model/task";
import { delay } from "../helpers/utils";
import { useState } from "react";

export function useTask() {
	const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);
	const [isUpdatingTask, setIsUpdatingTask] = useState(false);
	const [isDeletingTask, setIsDeletingTask] = useState(false);

	function prepareTask() {
		setTasks([
			...tasks,
			{
				id: Math.random().toString(36).substring(2, 9),
				title: "",
				state: TaskState.Creating,
			},
		]);
	}

	async function updateTask(id: string, payload: { title: Task["title"] }) {
		setIsUpdatingTask(true);
		await delay(1000);
		setTasks(
			tasks.map((task) =>
				task.id === id
					? { ...task, state: TaskState.Created, ...payload }
					: task,
			),
		);
		setIsUpdatingTask(false);
	}

	function updateTaskStatus(id: string, concluded: boolean) {
		setTasks(
			tasks.map((task) => (task.id === id ? { ...task, concluded } : task)),
		);
	}

	async function deleteTask(id: string) {
		setIsDeletingTask(true);
		await delay(1000);
		setTasks(tasks.filter((task) => task.id !== id));
		setIsDeletingTask(false);
	}

	return {
		isUpdatingTask,
		isDeletingTask,
		prepareTask,
		updateTask,
		updateTaskStatus,
		deleteTask,
	};
}
