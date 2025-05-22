import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type JSX, type ReactNode } from "react";

export const textVariants = cva("font-sans text-gray-400", {
	variants: {
		variant: {
			"body-sm-bold": "text-sm leading-5 font-semibold",
			"body-md": "text-base leading-6 font-normal",
			"body-md-bold": "text-base leading-6 font-normal",
		},
	},
	defaultVariants: {
		variant: "body-md",
	},
});

type TextProps = VariantProps<typeof textVariants> & {
	as?: keyof JSX.IntrinsicElements;
	className?: string;
	children?: ReactNode;
};

export function Text({
	as = "span",
	variant,
	className,
	children,
	...props
}: TextProps) {
	return createElement(
		as,
		{ className: textVariants({ variant, className }), ...props },
		children,
	);
}
