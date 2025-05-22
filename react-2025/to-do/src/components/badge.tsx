import type { ComponentProps } from "react";
import { Text } from "./text";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./skeleton";

export const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-full",
	{
		variants: {
			variant: {
				none: "",
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
			none: "",
			primary: "text-green-dark",
			secondary: "text-pink-dark",
		},
	},
});

export const badgeSkeletonVariants = cva("", {
	variants: {
		size: {
			sm: "w-6 h-6",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

type BadgeProps = ComponentProps<"div"> &
	VariantProps<typeof badgeVariants> & {
		loading?: boolean;
	};

export function Badge({
	variant,
	size,
	className,
	loading = false,
	children,
	...props
}: BadgeProps) {
	if (loading) {
		return (
			<Skeleton
				className={cx(
					badgeVariants({ variant: "none" }),
					badgeSkeletonVariants({ size }),
					className,
				)}
				rounded="full"
			/>
		);
	}

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
