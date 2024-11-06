"use client";

import React, { useState } from "react";

const RecoverAccount = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.trim() === "") {
			alert("Please enter a valid email address.");
		} else {
			alert(`Recovery email submitted: ${email}`);
		}
	};

	return (
		<div className="flex flex-col gap-2 w-[400px] p-4">
			<h2>Recover Account</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Enter your recovery email</label>
					<input
						className="p-2"
						type="email"
						name="email"
						placeholder=" email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="h-12 w-20 p-2 bg-red-600 rounded-md text-white">
					Submit
				</button>
			</form>
		</div>
	);
};

export default RecoverAccount;
