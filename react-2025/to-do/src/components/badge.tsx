import type { ComponentProps } from "react";
import { Text } from "./text";
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-full",
	{
		variants: {
			variant: {
				primary: "bg-green-light",
				secondary: "bg-pink-light",
			},
			size: {
				sm: "py-0.5 px-2",
			},
		},
		defaultVariants: {
			size: "sm",
			variant: "primary",
		},
	},
);

export const badgeTextVariants = cva("", {
	variants: {
		variant: {
			primary: "text-green-dark",
			secondary: "text-pink-dark",
		},
	},
});
type BadgeProps = ComponentProps<"div"> & VariantProps<typeof badgeVariants>;

export function Badge({
	variant,
	size,
	className,
	children,
	...props
}: BadgeProps) {
	return (
		<div className={badgeTextVariants({ variant, className })} {...props}>
			<Text
				variant="body-sm-bold"
				className={badgeVariants({ variant, size, className })}
			>
				{children}
			</Text>
		</div>
	);
}
