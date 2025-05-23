import { Button } from "../components/button";
import PlusIcon from "../assets/icons/plus.svg?react";
import { TaskItem } from "./task-item";
import { useTask } from "../hooks/use-task";
import { useTasks } from "../hooks/use-tasks";
import { TaskState } from "../model/task";

export function TasksList() {
	const { tasks } = useTasks();
	const { prepareTask } = useTask();

	const haveCreatingTask = tasks.some(
		(task) => task.state === TaskState.Creating,
	);

	function handleNewTask() {
		prepareTask();
	}
	return (
		<>
			<section>
				<Button
					icon={PlusIcon}
					className="w-full"
					onClick={handleNewTask}
					disabled={haveCreatingTask}
				>
					Nova tarefa
				</Button>
			</section>
			<section className="space-y-2">
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} />
				))}
			</section>
		</>
	);
}
