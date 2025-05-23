import useLocalStorage from "use-local-storage";
import { type Task, TASK_KEY, TaskState } from "../model/task";

export function useTask() {
	const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);

	function prepareTask() {
		setTasks([
			...tasks,
			{
				id: Math.random().toString(36).substring(2, 0),
				title: "",
				state: TaskState.Creating,
			},
		]);
	}

	return {
		prepareTask,
	};
}
