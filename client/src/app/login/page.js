// import Sidebar from "@/components/sidebar/page";
// import Link from "next/link";
// import React from "react";

// const Login = () => {
// 	return (
// 		<div className=" h-full bg-red-500 border-2 border-red-400 justify-center items-center  rounded-lg text-sm bg-gradient-to-tl from-blue-400 to-blue-500 p-8">
// 			<form className="flex flex-col w-[500px] h-[300px] m-auto p-4 bg-white   rounded-md">
// 				<h1 className="text-center text-xl font-bold">Login Form</h1>
// 				<label htmlFor="username">Username</label>
// 				<input
// 					className="rounded-md p-2"
// 					type="text"
// 					name="username"
// 					placeholder="username or email"
// 					required
// 				/>
// 				<div className="flex flex-col">
// 					<label htmlFor="password">Password</label>
// 					<input
// 						className="rounded-md p-2"
// 						type="password"
// 						name="password"
// 						placeholder="password"
// 						required
// 					/>
// 				</div>
// 				<div className="italic hover:underline">
// 					<Link href="/recover-account"> forgot password? </Link>
// 				</div>

// 				<div className="flex gap-20 justify-between m-auto ]">
// 					<Link href="/home">
// 						<button className="bg-green-600 p-2 text-white rounded-md">
// 							Login{" "}
// 						</button>
// 					</Link>
// 					<Link href="/signupformik">
// 						<button className="bg-red-600 p-2 text-white rounded-md">
// 							Signup
// 						</button>
// 					</Link>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default Login;

import { LoginFormJsx } from "@/components/login-form";
import React from "react";

const LoginForm = () => {
	return (
		<div>
			<LoginFormJsx />
		</div>
	);
};

export default LoginForm;
