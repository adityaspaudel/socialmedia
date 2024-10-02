// import "../styles/globals.css";
// import Sidebar from "../components/Sidebar";

// function MyApp({ Component, pageProps }) {
// 	return (
// 		<div className="flex">
// 			<Sidebar />
// 			<main className="flex-1">
// 				<Component {...pageProps} />
// 			</main>
// 		</div>
// 	);
// }

// export default MyApp;



//solution2-------------------------

import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex">
			<div
				className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out`}>
				<div className="flex items-center justify-between p-4">
					<h1 className="text-2xl font-bold">My Social Media</h1>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
				<nav className="mt-10">
					<Link href="/">
						<a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
							Home
						</a>
					</Link>
					<Link href="/profile">
						<a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
							Profile
						</a>
					</Link>
					<Link href="/messages">
						<a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
							Messages
						</a>
					</Link>
					<Link href="/settings">
						<a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
							Settings
						</a>
					</Link>
				</nav>
			</div>
			<div className="flex-1 ml-64 p-4">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>
				</button>
				<h1 className="text-3xl font-bold">Welcome to My Social Media</h1>
				{/* Your main content goes here */}
			</div>
		</div>
	);
};

export default Sidebar;
