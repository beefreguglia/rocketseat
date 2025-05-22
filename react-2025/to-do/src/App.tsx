import { Icon } from "./components/icon";
import { Text } from "./components/text";
import TrashIcon from "./assets/icons/trash.svg?react";
import CheckIcon from "./assets/icons/check.svg?react";
import CopyIcon from "./assets/icons/copy.svg?react";
import PencilIcon from "./assets/icons/pencil.svg?react";
import PlusIcon from "./assets/icons/plus.svg?react";
import XIcon from "./assets/icons/x.svg?react";
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { ButtonIcon } from "./components/button-icon";
import { InputText } from "./components/input-text";
import { InputCheckbox } from "./components/input-checkbox";

export function App() {
	return (
		<div className="grid gap-3">
			<Text variant="body-md-bold">Olá Mundo</Text>
			<div className="flex gap-1">
				<Icon svg={TrashIcon} className="fill-green-base" />
				<Icon svg={CheckIcon} className="fill-green-base" />
				<Icon svg={CopyIcon} className="fill-green-base" />
				<Icon svg={PencilIcon} className="fill-green-base" />
				<Icon svg={PlusIcon} className="fill-green-base" />
				<Icon svg={XIcon} className="fill-green-base" />
			</div>
			<Badge>2 de 5</Badge>

			<Button icon={XIcon} disabled>
				Botão
			</Button>
			<ButtonIcon icon={CopyIcon} />
			<ButtonIcon icon={CheckIcon} variant="secondary" />
			<ButtonIcon icon={TrashIcon} variant="tertiary" />
			<ButtonIcon icon={TrashIcon} variant="tertiary" disabled />
			<InputText />
			<div>
				<InputCheckbox />
			</div>
		</div>
	);
}
