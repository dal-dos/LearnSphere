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
import { useProfile } from "@/hooks";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

const Signup = () => {
	const { signup, isLoggedIn } = useAuth();
	const { createProfile } = useProfile();

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
		try {
			const authResponse = await signup({
				username: formValues.username,
				password: formValues.password,
				role: formValues.role,
			});

			if (authResponse.success) {
				const profileResponse = await createProfile({
					name: formValues.name,
					username: formValues.username,
					role: formValues.role,
				});

				if (profileResponse.success) {
					toast({
						title: "Signup successful",
					});
					redirect("../dashboard");
					return;
				}
			}

			throw new Error(
				authResponse.message + " " + profileResponse.message
			);
		} catch (error) {
			console.error("Error during signup:", error); // Log any errors
			toast({
				variant: "destructive",
				title: "Signup Failed!",
				description:
					error.message || "An error occurred during signup.",
			});
		}
	});

	return (
		<div className="mx-auto w-1/2 min-w-80 rounded-lg border p-2">
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
						type="password"
					/>
					<ErrorMessage error={errors.password} />
				</section>
				<section>
					<Label aria-required>Confirm Password</Label>
					<Input
						type="password"
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
				<div className="text-center">
					<Button type="submit">
						<span>Signup</span>
					</Button>
				</div>
			</form>
			<div className="text-center">
				Already have an account?
				<Button type="button" variant="link" asChild>
					<Link to="/login">Log in</Link>
				</Button>
			</div>
		</div>
	);
};

export default Signup;
