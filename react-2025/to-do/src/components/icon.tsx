import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, FC } from "react";

export const iconVariants = cva("", {
	variants: {
		animate: {
			false: "",
			true: "animate-spin",
		},
	},
	defaultVariants: {
		animate: false,
	},
});

type IconProps = ComponentProps<"svg"> &
	VariantProps<typeof iconVariants> & {
		svg: FC<ComponentProps<"svg">>;
	};

export function Icon({
	svg: SVGComponent,
	animate,
	className,
	...props
}: IconProps) {
	return (
		<SVGComponent className={iconVariants({ animate, className })} {...props} />
	);
}
