import type { ButtonProps } from "./types"

const variantClasses = {
	solid: "border border-[#8b5367] bg-[#8b5367] text-white hover:bg-[#704154]",
	outline: "border border-[#8b5367] bg-transparent text-[#8b5367] hover:bg-[#eadbd4]",
	ghost: "border border-transparent bg-transparent text-[#8b5367] underline-offset-4 hover:underline",
}

export const Button = ({
	children,
	variant = "solid",
	fullWidth = false,
	className = "",
	...props
}: ButtonProps) => (
	<button
		className={`mx-auto flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
		{...props}
	>
		{children}
	</button>
)
