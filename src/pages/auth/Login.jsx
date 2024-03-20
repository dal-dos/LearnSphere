import React from "react";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import ErrorMessage from "@/components/ErrorMessage";
import FormHeading from "@/components/FormHeading";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const { toast } = useToast();
	const redirect = useNavigate();

	const onSubmit = handleSubmit(async function (formValues) {
		const response = await login(formValues);

		if (response.success) {
			toast({
				title: "Login successful",
			});
			redirect("../dashboard");
		} else {
			toast({
				variant: "destructive",
				title: "Login Failed!",
				description: response.message,
			});
		}
	});

	return (
		<div className="w-1/2 translate-x-1/2 border rounded-lg p-2 pb-4">
			<FormHeading>Login</FormHeading>
			<form onSubmit={onSubmit} className="space-y-4 px-2">
				<section>
					<Label aria-required>Username</Label>
					<Input
						{...register("username", {
							required: "Username is required",
						})}
						autoComplete="username"
						className={cn(
							errors.username
								? "focus-visible:ring-destructive"
								: null
						)}
					/>
					<ErrorMessage error={errors.username} />
				</section>
				<section>
					<Label aria-required>Password</Label>
					<Input
						{...register("password", {
							required: "Password is required",
						})}
						autoComplete="password"
						className={cn(
							errors.password
								? "focus-visible:ring-destructive"
								: null
						)}
					/>
					<ErrorMessage error={errors.password} />
				</section>
				<Button type="submit">
					<span>Login</span>
				</Button>
			</form>
		</div>
	);
};

export default Login;
