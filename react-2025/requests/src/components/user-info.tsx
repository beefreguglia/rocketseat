import { useEffect } from "react";
import { useUser } from "../hooks/use-user";

export function UserInfo() {
	const { user, getUser, userRequestStatus } = useUser();

	useEffect(() => {
		getUser("gus");
	}, [getUser]);

	if (userRequestStatus === "loading") {
		return <div>Carregando usuário...</div>;
	}

	return (
		<ul>
			<li>Nome: {user?.name}</li>
			<li>Username: {user?.id}</li>
		</ul>
	);
}
