import { Container } from "../components/container";
import Logo from "../assets/images/logo.svg?react";

export function Header() {
	return (
		<Container as="header">
			<Logo className="h-9 md:h-12" />
		</Container>
	);
}
