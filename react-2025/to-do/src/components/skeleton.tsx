import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const skeletonVariants = cva(
	`
    animate-pulse bg-gray-200 pointer-events-none
  `,
	{
		variants: {
			rounded: {
				sm: "rounded-sm",
				lg: "rounded-lg",
				full: "rounded-full",
			},
		},
		defaultVariants: {
			rounded: "lg",
		},
	},
);

type SkeletonProps = VariantProps<typeof skeletonVariants> &
	ComponentProps<"div">;

export function Skeleton({ rounded, className, ...props }: SkeletonProps) {
	return (
		<div className={skeletonVariants({ rounded, className })} {...props} />
	);
}
