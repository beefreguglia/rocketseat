import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInfo } from "./components/user-info";
import { UserNewForm } from "./components/user-new-form";
import { UsersList } from "./components/users-list";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserInfo />
			<hr />
			<UserNewForm />
			<hr />
			<UsersList />
		</QueryClientProvider>
	);
}
