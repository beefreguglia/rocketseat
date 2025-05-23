import useLocalStorage from "use-local-storage";
import { TASK_KEY, TaskState, type Task } from "../model/task";
import { delay } from "../helpers/utils";
import { useEffect, useState } from "react";

export function useTasks() {
	const [tasksData] = useLocalStorage<Task[]>(TASK_KEY, []);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoadingTasks, setIsLoadingTasks] = useState(true);

	useEffect(() => {
		async function fetchTasks() {
			if (isLoadingTasks) {
				await delay(2000);
				setIsLoadingTasks(false);
			}

			setTasks(tasksData);
		}
		fetchTasks();
	}, [isLoadingTasks, tasksData]);

	return {
		tasks,
		tasksCount: tasks.filter((task) => task.state === TaskState.Created).length,
		concludedTasksCount: tasks.filter((task) => task.concluded).length,
		isLoadingTasks,
	};
}
