"use client";

import {
	Bell,
	Home,
	Search,
	Mail,
	User,
	Users,
	Settings,
	LogOut,
} from "lucide-react";
import { FaConnectdevelop } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
// import SearchComponent from "./search/search-component";
import axios from "axios";
export function SocialMediaSidebarComponent() {
	

	return (
		<div
			className="flex flex-col left-0 top-0 sticky h-screen w-[80px] sm:w-[100px] md:w-[200px] xl:w-[250px]  
		  bg-blue-50 justify-between border-r bg-background p-2">
			<div className="space-y-4">
				<Link
					href="/home"
					className="flex gap-2 px-4">
					<FaConnectdevelop className="text-2xl" />
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight hover:underline hidden md:block">
						MySocialApp
					</h2>
				</Link>
				<div className="space-y-1">
					<Link href="/home">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-gray-200">
							<Home className="mr-2 h-6 w-6" />
							<span className="hidden md:block">Home</span>
						</Button>
					</Link>
					<Link href="/search">
						<Button
							// onClick={() => router.push("/search")}
							variant="ghost"
							className="flex gap-2 w-full justify-start myInput hover:bg-gray-200">
							<Search className="mr-2 h-6 w-6 " />
							<input
								className="w-full bg-transparent focus:outline-none hidden md:block"
								type="text"
								placeholder="Search"
							/>
						</Button>
						{/* <SearchComponent /> */}
					</Link>
					<Link href="/notifications">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-gray-200">
							<Bell className="mr-2 h-6 w-6" />
							<span className="hidden md:block">Notifications</span>
						</Button>
					</Link>
					<Link href="/messages">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-gray-200">
							<Mail className="mr-2 h-6 w-6" />
							<span className=" hidden md:block">Messages</span>
						</Button>
					</Link>
					<Link href="/profile">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-gray-200">
							<User className="mr-2 h-6 w-6" />
							<span className="hidden md:block">Profile</span>
						</Button>
					</Link>
					<Link href="/friends">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-gray-200">
							<Users className="mr-2 h-6 w-6" />
							<span className=" hidden md:block">Friends</span>
						</Button>
					</Link>
				</div>
			</div>
			<div className="space-y-1 p-2">
				<div className="flex items-center space-x-2 rounded-md border  hover:bg-gray-200">
					<Link
						href="/profile"
						className="flex items-center">
						<Avatar>
							<AvatarImage
								src="/cartoon-cute.jpg"
								alt="User"
							/>
							{/* <AvatarFallback>UN</AvatarFallback> */}
						</Avatar>
						<div className="flex flex-col ">
							<p className="text-sm font-medium leading-none hidden md:block">
								User Name
							</p>
							<p className="text-sm text-muted-foreground hidden md:block">
								@username
							</p>
						</div>
					</Link>
				</div>
				<div className="">
					{/* <Link href="/user/usersettings"> </Link> */}
					<Link href="/usersettings">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-gray-200">
							<Settings className="mr-2 h-6 w-6" />
							<span className="logout hidden md:block">Setting</span>
						</Button>
					</Link>

					<Link href="/">
						<Button
							variant="ghost"
							className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-gray-200">
							<LogOut className="mr-2 h-6 w-6 " />
							<span className="logout hidden md:block">Log out</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

// path params vs query params
