import { useUsers } from "../hooks/use-users";

export function UsersList() {
	const { isLoadingUsers, users } = useUsers();

	if (isLoadingUsers) {
		return <div>Carregando todos usuários</div>;
	}

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>
					Nome: {user.name} / Username: {user.id}
				</li>
			))}
		</ul>
	);
}
