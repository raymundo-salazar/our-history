import type { IconButtonProps } from "./types"

export const IconButton = ({ children, className = "", ...props }: IconButtonProps) => (
	<button
		className={`flex min-h-10 items-center justify-center gap-2 border-0 bg-transparent px-0 text-sm text-inherit ${className}`}
		{...props}
	>
		{children}
	</button>
)
