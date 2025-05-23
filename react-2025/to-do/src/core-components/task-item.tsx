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

type TaskItemProps = {
	task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(
		task?.state === TaskState.Creating,
	);
	const [taskTitle, setTaskTitle] = useState(task?.title || "");

	const { updateTask, updateTaskStatus } = useTask();

	function handleEditingTask() {
		setIsEditing(true);
	}

	function handleExitEditingTask() {
		setIsEditing(false);
	}

	function handleChangeTaskTitle(e: ChangeEvent<HTMLInputElement>) {
		setTaskTitle(e.target.value || "");
	}

	function handleSaveTask(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log({ id: task.id, title: task.title });
		updateTask(task.id, { title: taskTitle });
		setIsEditing(false);
	}

	function handleChangeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
		const checked = e.target.checked;

		updateTaskStatus(task.id, checked);
	}

	return (
		<Card size="md">
			{!isEditing ? (
				<div className="flex items-center gap-4">
					<InputCheckbox
						checked={task?.concluded}
						onChange={handleChangeTaskStatus}
					/>
					<Text
						className={cx("flex-1", { "line-through": task?.concluded })}
						variant="body-md"
					>
						{task?.title}
					</Text>
					<div className="flex items-center gap-1 py-1">
						<ButtonIcon variant="tertiary" icon={TrashIcon} />
						<ButtonIcon
							variant="tertiary"
							icon={PencilIcon}
							onClick={handleEditingTask}
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
						<ButtonIcon type="submit" variant="primary" icon={CheckIcon} />
					</div>
				</form>
			)}
		</Card>
	);
}
