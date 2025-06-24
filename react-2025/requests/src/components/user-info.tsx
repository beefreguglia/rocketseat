import { useEffect } from "react";
import { useUser } from "../hooks/use-user";

export function UserInfo() {
	const { user, getUser, requestStatus } = useUser();

	useEffect(() => {
		getUser("gus");
	}, [getUser]);

	if (requestStatus === "loading") {
		return <div>Carregando usuário...</div>;
	}

	return (
		<ul>
			<li>Nome: {user?.name}</li>
			<li>Username: {user?.id}</li>
		</ul>
	);
}
