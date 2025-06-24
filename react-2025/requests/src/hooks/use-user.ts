import { useCallback, useState } from "react";
import { api, fetcher } from "../helpers/api";
import type { User } from "../models/user";

export function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [userRequestStatus, setUserRequestStatus] = useState<
		"idle" | "loading" | "saving"
	>("idle");

	const getUser = useCallback(async (userName: string) => {
		try {
			setUserRequestStatus("loading");

			const data = await fetcher(`/users/${userName}`);

			setUser(data);
		} catch (error) {
			console.log(error);
			alert("Erro ao buscar usuário");
		} finally {
			setUserRequestStatus("idle");
		}
	}, []);

	async function createUser(payload: User) {
		try {
			setUserRequestStatus("saving");

			await api("/users", { method: "POST", body: JSON.stringify(payload) });

			alert("Usuário criado com sucesso!");
		} catch (error) {
			console.log(error);
			alert("Erro ao criar usuário!");
		} finally {
			setUserRequestStatus("idle");
		}
	}

	return { user, userRequestStatus, getUser, createUser };
}
