import useLocalStorage from "use-local-storage";
import { TASK_KEY, type Task } from "../model/task";

export function useTasks() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);

	return {
		tasks,
		tasksCount: tasks.length,
		concludedTasksCount: tasks.filter((task) => task.concluded).length,
	};
}
