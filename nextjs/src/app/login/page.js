import Sidebar from "@/components/sidebar/page";
import Link from "next/link";
import React from "react";

const Login = () => {
	return (
		<div className="m-auto w-[40%] bg-red-500 border-2 justify-center  content-center rounded-md">
			<form className="flex flex-col m-auto mt-10 mb-10 w-[90%] bg-gray-500 rounded-md">
				<label for="username">Username</label>
				<input
					className="rounded-md p-2"
					type="text"
					name="username"
					placeholder="username or email"
					required
				/>
				<label for="password">Password</label>
				<input
					className="rounded-md p-2"
					type="text"
					name="password"
					placeholder="password"
					required
				/>
				<div className="italic">
					forgot password?<Link href="">recover</Link>
				</div>

				<div className="flex gap-20 m-auto sm:">
					<button className="bg-green-600">Login</button>
					<button>Signup</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
