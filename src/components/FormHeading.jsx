import { cn } from "@/lib/utils";

export default function FormHeading({ children }) {
	return (
		<h2
			className={cn(
				"my-4 w-full text-center text-4xl font-bold tracking-tight"
			)}
		>
			{children}
		</h2>
	);
}
