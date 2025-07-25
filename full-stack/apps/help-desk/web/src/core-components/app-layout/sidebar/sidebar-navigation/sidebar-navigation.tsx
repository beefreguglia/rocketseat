import { Icon } from "@/components/icon/icon.tsx";
import { Text } from "@/components/text/text.tsx";
import { menuItems } from "@/data/menu-itens";
import { useAuth } from "@/hooks/use-auth.ts";

export function SidebarNavigation() {
	const { session } = useAuth();

	const canViewItem = (roles: UserApiRole[]) => {
		return roles.includes(session?.user.role ?? "CLIENT");
	};

	const isMenuItemActive = (route: string) => {
		console.log(location.pathname);
		return location.pathname.startsWith(route);
	};

	return (
		<nav className="px-4 py-5">
			{menuItems.map(({ userRoles, iconName, id, route, title }) =>
				canViewItem(userRoles) ? (
					<a
						key={id}
						href={route}
						className={`flex items-center gap-3 p-3 rounded-xs bg-gray-100 text-gray-400 ${
							isMenuItemActive(route) ? "bg-blue-dark! text-gray-600!" : ""
						}`}
					>
						<Icon size="xl" iconName={iconName} />
						<Text variant="text-sm">{title}</Text>
					</a>
				) : null,
			)}
		</nav>
	);
}
