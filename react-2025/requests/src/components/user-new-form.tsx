import { type FormEvent, useRef } from "react";
import { useUser } from "../hooks/use-user";
import type { User } from "../models/user";

export function UserNewForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const { createUser, userRequestStatus } = useUser();

	async function handleSubmit(e: FormEvent) {
		if (!formRef.current) {
			return;
		}

		const data = new FormData(formRef.current);

		const payload = {
			id: data.get("id"),
			name: data.get("name"),
		};

		await createUser(payload as User);

		e.preventDefault();
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<div>
				<input type="text" placeholder="Username" name="id" required />
			</div>
			<div>
				<input type="text" placeholder="Nome" name="name" required />
			</div>
			<div>
				<button type="submit">
					{userRequestStatus === "saving" ? "Criando" : "Criar Usuário"}
				</button>
			</div>
		</form>
	);
}
