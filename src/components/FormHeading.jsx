import { cn } from "@/lib/utils";

export default function FormHeading({ children }) {
	return (
		<h2
			className={cn(
				"my-4 w-full text-center text-4xl tracking-tight font-bold"
			)}
		>
			{children}
		</h2>
	);
}
