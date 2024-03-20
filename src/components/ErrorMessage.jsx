export default function ErrorMessage({ error }) {
	return (
		error && (
			<span className="text-sm font-medium text-destructive">
				{error?.message}
			</span>
		)
	);
}
