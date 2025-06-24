import { useCallback, useState } from "react";
import { fetcher } from "../helpers/api";
import type { User } from "../models/user";

export function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [requestStatus, setRequestStatus] = useState<
		"idle" | "loading" | "saving"
	>("idle");

	const getUser = useCallback(async (userName: string) => {
		try {
			setRequestStatus("loading");

			const data = await fetcher(`/users/${userName}`);

			setUser(data);
		} catch (error) {
			console.log(error);
			alert("Erro ao buscar usuário");
		} finally {
			setRequestStatus("idle");
		}
	}, []);

	return { user, requestStatus, getUser };
}
