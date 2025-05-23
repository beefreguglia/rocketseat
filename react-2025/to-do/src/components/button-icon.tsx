import { cva, cx, type VariantProps } from "class-variance-authority";
import { Icon } from "./icon";
import type { ComponentProps } from "react";
import { Skeleton } from "./skeleton";
import SpinnerIcon from "../assets/icons/spinner.svg?react";

const buttonIconVariants = cva(
	`
    inline-flex items-center justify-center cursor-pointer transition group
  `,
	{
		variants: {
			variant: {
				none: "",
				primary: "bg-green-base hover:bg-green-dark",
				secondary: "bg-gray-200 hover:bg-pink-base",
				tertiary: "bg-transparent hover:bg-gray-200",
			},
			size: {
				sm: "w-6 h-6 p-1 rounded",
			},
			disabled: {
				true: "opacity-50 pointer-events-none",
			},
			handling: {
				true: "pointer-events-none",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "sm",
			disabled: false,
			handling: false,
		},
	},
);

const buttonIconIconVariants = cva("transition", {
	variants: {
		variant: {
			none: "",
			primary: "fill-white",
			secondary: "fill-pink-base group-hover:fill-white",
			tertiary: "fill-gray-300 group-hover:fill-gray-400",
		},
		size: {
			sm: "w-4 h-4",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "sm",
	},
});

type ButtonIconProps = Omit<ComponentProps<"button">, "size" | "disabled"> &
	VariantProps<typeof buttonIconVariants> & {
		icon?: ComponentProps<typeof Icon>["svg"];
		loading?: boolean;
		handling?: boolean;
	};

export function ButtonIcon({
	variant,
	size,
	disabled,
	className,
	icon,
	loading,
	handling,
	...props
}: ButtonIconProps) {
	if (loading) {
		return (
			<Skeleton
				className={cx(buttonIconVariants({ variant: "none", size, className }))}
			/>
		);
	}

	return (
		<button
			className={buttonIconVariants({
				className,
				disabled,
				size,
				variant,
				handling,
			})}
			{...props}
		>
			{icon && (
				<Icon
					svg={handling ? SpinnerIcon : icon}
					animate={handling}
					className={buttonIconIconVariants({ variant, size })}
				/>
			)}
		</button>
	);
}
