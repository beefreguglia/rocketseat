import { ButtonIcon } from "../components/button-icon";
import { Card } from "../components/card";
import { InputCheckbox } from "../components/input-checkbox";
import { Text } from "../components/text";
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import { useState } from "react";
import { InputText } from "../components/input-text";

export function TaskItem() {
	const [isEditing, setIsEditing] = useState(false);

	function handleEditingTask() {
		setIsEditing(true);
	}

	function handleExitEditingTask() {
		setIsEditing(false);
	}

	return (
		<Card size="md" className="flex items-center gap-4">
			{!isEditing ? (
				<>
					<InputCheckbox />
					<Text className="flex-1" variant="body-md">
						Fazer compras da semana
					</Text>
					<div className="flex items-center gap-1 py-1">
						<ButtonIcon variant="tertiary" icon={TrashIcon} />
						<ButtonIcon
							variant="tertiary"
							icon={PencilIcon}
							onClick={handleEditingTask}
						/>
					</div>
				</>
			) : (
				<>
					<InputText className="flex-1" />
					<div className="flex items-center gap-1">
						<ButtonIcon
							variant="secondary"
							icon={XIcon}
							onClick={handleExitEditingTask}
						/>
						<ButtonIcon variant="primary" icon={CheckIcon} />
					</div>
				</>
			)}
		</Card>
	);
}
