import { Container } from "../components/container";
import { TasksList } from "../core-components/tasks-lists";
import { TasksSummary } from "../core-components/tasks-summary";

export function PageHome() {
	return (
		<Container as="article" className="space-y-3">
			<header className="flex items-center justify-between">
				<TasksSummary />
			</header>
			<TasksList />
		</Container>
	);
}
