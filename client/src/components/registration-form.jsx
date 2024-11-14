"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm password is required"),
});

export function RegistrationFormJsx() {
	const [registrationSuccess, setRegistrationSuccess] = useState(false);

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		// validationSchema: validationSchema,
		// onSubmit: (values, { setSubmitting, resetForm }) => {
		// 	// Simulate API call
		// 	setTimeout(() => {
		// 		console.log(values);
		// 		setRegistrationSuccess(true);
		// 		setSubmitting(false);
		// 		resetForm();
		// 	}, 1000);
		// },

		validationSchema,
		onSubmit: async (values) => {
			try {
				const { data } = await axios.post(
					"http://localhost:8000/register",
					values
				);
				if (data) {
					toast({
						title: data.msg,
					});
				}
			} catch (error) {
				debugger;
				toast({
					variant: "destructive",
					title: error?.response?.data?.msg,
				});
			}
		},
	});

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Register
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={formik.handleSubmit}
					className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="Enter your name"
							{...formik.getFieldProps("name")}
							className={`${
								formik.errors.name && formik.touched.name
									? "border-red-500"
									: ""
							}`}
						/>
						{formik.errors.name && formik.touched.name && (
							<p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
						)}
					</div>

					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Enter your email"
							{...formik.getFieldProps("email")}
							className={`${
								formik.errors.email && formik.touched.email
									? "border-red-500"
									: ""
							}`}
						/>
						{formik.errors.email && formik.touched.email && (
							<p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
						)}
					</div>

					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Enter your password"
							{...formik.getFieldProps("password")}
							className={`${
								formik.errors.password && formik.touched.password
									? "border-red-500"
									: ""
							}`}
						/>
						{formik.errors.password && formik.touched.password && (
							<p className="mt-1 text-xs text-red-500">
								{formik.errors.password}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Confirm your password"
							{...formik.getFieldProps("confirmPassword")}
							className={`${
								formik.errors.confirmPassword && formik.touched.confirmPassword
									? "border-red-500"
									: ""
							}`}
						/>
						{formik.errors.confirmPassword &&
							formik.touched.confirmPassword && (
								<p className="mt-1 text-xs text-red-500">
									{formik.errors.confirmPassword}
								</p>
							)}
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={formik.isSubmitting}>
						{formik.isSubmitting ? "Registering..." : "Register"}
					</Button>
				</form>

				{registrationSuccess && (
					<Alert className="mt-4">
						<AlertDescription>
							Registration successful! Please check your email for confirmation.
						</AlertDescription>
					</Alert>
				)}
			</CardContent>
		</Card>
	);
}
