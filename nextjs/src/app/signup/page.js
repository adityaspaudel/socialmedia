"use client";

import VideoPlayer from "@/components/videoplayer/page";
import { Icon } from "@material-ui/core";
import React, { useState } from "react";

const Signup = () => {
	// debugger;
	// function handlePassword() {
	// 	if (document.getElementsByClassName("cpassword")[0].type == "password") {
	// 		document.getElementsByClassName("cpassword")[0].type == "text";
	// 	}
	// 	if (document.getElementsByClassName("cpassword")[0].type == "text") {
	// 		document.getElementsByClassName("cpassword")[0].type == "password";
	// 	}

	// }
	const [password, setPassword] = useState("");
	const [type, setType] = useState("password");
	const [icon, setIcon] = useState("eyeOff");
	function handlePassword() {
		if (type === "password") {
			setIcon(eye);
			setType("text");
		} else {
			setIcon(eyeOff);
			setType("password");
		}
	}
	return (
		<div className="w-[60%] m-auto ">
			{/* <VideoPlayer/> */}
			<form
				onsubmit="console.log('You clicked submit.'); return false"
				className="flex flex-col gap-8 bg-pink-100 p-4 m-auto text-green-400 rounded-2xl"
				action="">
				<div className="flex flex-col gap-2">
					<label htmlFor="firstname">
						<input
							className="p-2"
							type="text"
							name="firstname"
							placeholder="Enter Your First Name"
						/>
					</label>
				</div>
				<div>
					<label htmlFor="lastname">
						<input
							className="p-2"
							type="text"
							name="lastname"
							placeholder="Enter Your Last Name"
						/>
					</label>
				</div>
				<div>
					<label htmlFor="email">
						<input
							className="p-2"
							type="email"
							name="email"
							placeholder="email"
						/>
					</label>
				</div>
				<div>
					<label htmlFor="password">
						{" "}
						<input
							className="p-2"
							type="password"
							name="password"
							placeholder="Enter Password"
						/>
					</label>
				</div>
				<div>
					<label htmlFor="cpassword">
						<input
							type={type}
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password"
						/>
					</label>

					<span
						class="flex justify-around items-center"
						onClick={handlePassword}>
						<Icon
							class="absolute mr-10"
							icon={icon}
							size={50}
						/>
					</span>
				</div>
				<div>
					<input
						type="radio"
						value="Male"
						name="gender"
					/>{" "}
					Male
					<input
						type="radio"
						value="Female"
						name="gender"
					/>{" "}
					Female
					<input
						type="radio"
						value="Other"
						name="gender"
					/>{" "}
					Other
				</div>
				<button
					className="bg-red-400 "
					type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Signup;
