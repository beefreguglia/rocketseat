import { ButtonIcon } from "../components/button-icon";
import { Card } from "../components/card";
import { InputCheckbox } from "../components/input-checkbox";
import { Text } from "../components/text";
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { InputText } from "../components/input-text";
import { TaskState, type Task } from "../model/task";
import { cx } from "class-variance-authority";
import { useTask } from "../hooks/use-task";
import { Skeleton } from "../components/skeleton";

type TaskItemProps = {
	task: Task;
	loading?: boolean;
};

export function TaskItem({ task, loading }: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(
		task?.state === TaskState.Creating,
	);
	const [taskTitle, setTaskTitle] = useState(task?.title || "");

	const {
		updateTask,
		updateTaskStatus,
		deleteTask,
		isDeletingTask,
		isUpdatingTask,
	} = useTask();

	function handleEditingTask() {
		setIsEditing(true);
	}

	function handleExitEditingTask() {
		if (task.state === TaskState.Creating) {
			deleteTask(task.id);
		}

		setIsEditing(false);
	}

	function handleChangeTaskTitle(e: ChangeEvent<HTMLInputElement>) {
		setTaskTitle(e.target.value || "");
	}

	async function handleSaveTask(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log({ id: task.id, title: task.title });
		await updateTask(task.id, { title: taskTitle });
		setIsEditing(false);
	}

	function handleChangeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
		const checked = e.target.checked;

		updateTaskStatus(task.id, checked);
	}

	async function handleDeleteTask() {
		await deleteTask(task.id);
	}

	return (
		<Card size="md">
			{!isEditing ? (
				<div className="flex items-center gap-4">
					<InputCheckbox
						checked={task?.concluded}
						onChange={handleChangeTaskStatus}
						loading={loading}
					/>
					{!loading ? (
						<Text
							className={cx("flex-1", { "line-through": task?.concluded })}
							variant="body-md"
						>
							{task?.title}
						</Text>
					) : (
						<Skeleton className="flex-1 h-6" />
					)}
					<div className="flex items-center gap-1 py-1">
						<ButtonIcon
							variant="tertiary"
							icon={TrashIcon}
							onClick={handleDeleteTask}
							loading={loading}
							handling={isDeletingTask}
						/>
						<ButtonIcon
							variant="tertiary"
							icon={PencilIcon}
							onClick={handleEditingTask}
							loading={loading}
						/>
					</div>
				</div>
			) : (
				<form onSubmit={handleSaveTask} className="flex items-center gap-4">
					<InputText
						className="flex-1"
						onChange={handleChangeTaskTitle}
						required
						autoFocus
					/>
					<div className="flex items-center gap-1">
						<ButtonIcon
							type="button"
							variant="secondary"
							icon={XIcon}
							onClick={handleExitEditingTask}
						/>
						<ButtonIcon
							type="submit"
							variant="primary"
							icon={CheckIcon}
							handling={isUpdatingTask}
						/>
					</div>
				</form>
			)}
		</Card>
	);
}
