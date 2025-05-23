import { Button } from "../components/button";
import PlusIcon from "../assets/icons/plus.svg?react";
import { TaskItem } from "./task-item";
import { useTask } from "../hooks/use-task";
import { useTasks } from "../hooks/use-tasks";
import { TaskState, type Task } from "../model/task";

export function TasksList() {
	const { tasks, isLoadingTasks } = useTasks();
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
					disabled={haveCreatingTask || isLoadingTasks}
				>
					Nova tarefa
				</Button>
			</section>
			<section className="space-y-2">
				{!isLoadingTasks &&
					tasks.map((task) => <TaskItem key={task.id} task={task} />)}
				{isLoadingTasks && (
					<>
						<TaskItem task={{} as Task} loading />
						<TaskItem task={{} as Task} loading />
						<TaskItem task={{} as Task} loading />
					</>
				)}
			</section>
		</>
	);
}
