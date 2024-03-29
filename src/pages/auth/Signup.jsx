import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import ErrorMessage from "@/components/ErrorMessage";
import FormHeading from "@/components/FormHeading";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

const Signup = () => {
	const { signup, isLoggedIn } = useAuth();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			role: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});
	const { toast } = useToast();
	const redirect = useNavigate();

	if (isLoggedIn) {
		return <Navigate to={location.state?.from?.pathname || "/"} />;
	}

	const onSubmit = handleSubmit(async function (formValues) {
		const response = await signup(formValues);

		if (response.success) {
			toast({
				title: "Signup successful",
			});
			redirect("../dashboard");
		} else {
			toast({
				variant: "destructive",
				title: "Signup Failed!",
				description: response.message,
			});
		}
	});

	return (
		<div className="w-1/2 translate-x-1/2 border rounded-lg p-2 pb-4">
			<FormHeading>Register</FormHeading>
			<form onSubmit={onSubmit} className="space-y-4 px-2">
				<section>
					<Label aria-required>Full Name</Label>
					<Input
						{...register("name", {
							required: "Name is required",
						})}
						className={cn(
							errors.name
								? "focus-visible:ring-destructive"
								: null
						)}
					/>
					<ErrorMessage error={errors.name} />
				</section>
				<section>
					<Label aria-required>Role</Label>
					<Controller
						control={control}
						name="role"
						render={({ field }) => (
							<Select
								onValueChange={field.onChange}
								className={cn(
									errors.role
										? "focus-visible:ring-destructive"
										: null
								)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="student">
										Student
									</SelectItem>
									<SelectItem value="teacher">
										Teacher
									</SelectItem>
									<SelectItem value="admin">Admin</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					<ErrorMessage error={errors.role} />
				</section>
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
				<section>
					<Label aria-required>Confirm Password</Label>
					<Input
						{...register("confirmPassword", {
							required: "Confirm Password is required",
							validate: (value, formValues) => {
								if (value !== formValues.password) {
									return "Passwords do not match";
								}
								return true;
							},
						})}
						className={cn(
							errors.confirmPassword
								? "focus-visible:ring-destructive"
								: null
						)}
					/>
					<ErrorMessage error={errors.confirmPassword} />
				</section>
				<Button type="submit">
					<span>Signup</span>
				</Button>
			</form>
			<div className="text">
				Already have an account?
				<Button type="button" variant="link" asChild>
					<Link to="/login">Log in</Link>
				</Button>
			</div>
		</div>
	);
};

export default Signup;
