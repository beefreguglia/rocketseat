import { cva, cx, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { textVariants } from "./text";

export const inputTextVariants = cva(
	`
    border-b border-solid border-gray-200 focus:border-pink-base
    bg-transparent outline-none
  `,
	{
		variants: {
			size: {
				md: "px-2 pb-2",
			},
			disabled: {
				true: "pointer-events-none",
				false: "",
			},
		},
		defaultVariants: {
			disabled: false,
			size: "md",
		},
	},
);

type InputTextProps = VariantProps<typeof inputTextVariants> &
	Omit<ComponentProps<"input">, "size"> & {};

export function InputText({
	size,
	disabled,
	className,
	...props
}: InputTextProps) {
	return (
		<input
			className={cx(
				inputTextVariants({ disabled, size }),
				textVariants(),
				className,
			)}
			{...props}
		/>
	);
}
