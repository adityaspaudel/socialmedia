"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, Bell, User } from "lucide-react";
import Image from "next/image";

const navItems = [
	{ name: "Home", href: "/home", icon: Home },
	{ name: "Search", href: "/user/search", icon: Search },
	{ name: "Messages", href: "/user/messages", icon: MessageCircle },
	{ name: "Notifications", href: "/user/notifications", icon: Bell },
];

export default function Sidebar() {
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<aside className="flex flex-col h-screen w-64 bg-white border-r border-gray-200 fixed">
			<div className="p-4">
				<Link
					href="/"
					className="flex items-center space-x-2">
					{/* SocialApp Icon----------------------------------- */}
					<svg
						className="w-8 h-8 text-blue-500"
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
					</svg>
					{/* social app Name-------------------------------------------- */}
					<span className="text-xl font-bold">SocialApp</span>
				</Link>
			</div>
			<nav className="flex-1 p-2">
				<ul className="space-y-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.name}>
								<Link
									href={item.href}
									className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200 ${
										isActive
											? "bg-blue-100 text-blue-600"
											: "text-gray-700 hover:bg-gray-100"
									}`}>
									{/* returned logo for sidebar items------------------------ */}
									{item.icon && <item.icon className="w-6 h-6" />}

									{/* returned item name for sidebar items------------------------- */}
									<span>{item.name}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<div className="p-4 border-t border-gray-200 ">
				<Link
					href="/user/profile" //changemade
					className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
					<User className="w-6 h-6 " />
					<span>Profile</span>
				</Link>
			</div>
		</aside>
	);
}
