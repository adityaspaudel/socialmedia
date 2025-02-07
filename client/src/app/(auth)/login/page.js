"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
	const router = useRouter();

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				const response = await axios.post(
					"http://localhost:8000/login",
					values
				);
				console.log("Response Data:", response.data);
				alert("Login successful!");
				resetForm();
				router.push("/home"); // Redirect to the dashboard or desired page
			} catch (error) {
				console.error(
					"Error during Logging in:",
					error.response?.data || error.message
				);
				alert(error.response?.data?.msg || "Login Failed. Please try again.");
			}
		},
	});

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={formik.handleSubmit}
				className="w-full max-w-md p-6 bg-white rounded shadow">
				<h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

				{/* Email */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block mb-1 font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email"
						className={`w-full px-3 py-2 border rounded ${
							formik.touched.email && formik.errors.email
								? "border-red-500"
								: "border-gray-300"
						}`}
						{...formik.getFieldProps("email")}
					/>
					{formik.touched.email && formik.errors.email && (
						<p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
					)}
				</div>

				{/* Password */}
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block mb-1 font-medium">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter your password"
						className={`w-full px-3 py-2 border rounded ${
							formik.touched.password && formik.errors.password
								? "border-red-500"
								: "border-gray-300"
						}`}
						{...formik.getFieldProps("password")}
					/>
					{formik.touched.password && formik.errors.password && (
						<p className="mt-1 text-xs text-red-500">
							{formik.errors.password}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full py-2 text-white bg-green-400 rounded hover:bg-green-600"
					disabled={formik.isSubmitting}>
					{formik.isSubmitting ? "Logging in..." : "Login"}
				</button>

				{/* Additional Links */}
				<div className="mt-4 text-center">
					<p className="text-sm">
						<a
							href="/recovery"
							className="text-blue-500 hover:underline">
							Recover Account
						</a>
					</p>
					<p className="mt-2 text-sm">
						Dont have an account?{" "}
						<a
							href="/register"
							className="text-blue-500 hover:underline">
							Sign Up
						</a>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
