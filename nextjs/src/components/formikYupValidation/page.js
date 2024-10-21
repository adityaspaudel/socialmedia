"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	lastName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
});

export const ValidationSchemaExample = () => (
	<div>
		<div className="flex flex-col gap-2 bg-green-400 justify-center items-center">
			<h1>Signup Form</h1>
			<Formik
				className="flex flex-col gap-2 "
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					// same shape as initial values
					console.log(values);
				}}>
				{({ errors, touched }) => (
					<Form className="flex flex-col gap-2 w-[400px] p-4">
						<label htmlFor="firstName">First Name:</label>
						<Field
							className="p-[4px]"
							name="firstName"
						/>
						<div className="text-red-400 italic text-sm">
							{errors.firstName && touched.firstName ? (
								<div>{errors.firstName}</div>
							) : null}
						</div>
						<label htmlFor="lastName">Last Name:</label>
						<Field
							className="p-[4px]"
							name="lastName"
						/>
						<div className="text-red-400 italic text-sm">
							{errors.lastName && touched.lastName ? (
								<div>{errors.lastName}</div>
							) : null}
						</div>
						<label htmlFor="email">Email:</label>
						<Field
							className="p-[4px]"
							name="email"
							type="email"
						/>
						<div className="text-red-400 italic text-sm">
							{errors.email && touched.email ? <div>{errors.email}</div> : null}
						</div>
						<button
							className="w-[100px] bg-red-600 rounded-md text-white"
							type="submit">
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
		<div className=" right-0 top-0 repeat">
			<img
				src="/web-connection.png"
				height={320}
				width={320}
			/>
		</div>
	</div>
);
