import type { ButtonProps } from "./types"

const variantClasses = {
	solid: "border border-rose bg-rose text-white shadow-pink hover:bg-plum",
	outline: "border border-line bg-blush text-plum hover:bg-white",
	ghost: "border border-transparent bg-transparent text-plum underline-offset-4 hover:underline",
}

export const Button = ({
	children,
	variant = "solid",
	fullWidth = false,
	className = "",
	...props
}: ButtonProps) => (
	<button
		className={`mx-auto flex min-h-14 items-center justify-center gap-2 rounded-[20px] px-5 text-[15px] font-bold transition duration-200 active:scale-[.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum disabled:cursor-not-allowed disabled:bg-[#eddce6] disabled:text-[#9d8796] disabled:shadow-none ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
		{...props}
	>
		{children}
	</button>
)
