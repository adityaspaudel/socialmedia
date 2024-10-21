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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export function SocialMediaSidebarComponent() {
	useEffect(() => {
		let input1 = document.getElementsByClassName("myInput")[0];
		input1.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				// event.preventDefault();
				// document.getElementsByClassName("myInput")[0].click();
				window.location.href = "/user/search";
			}
		});
	}, []);
	return (
		<div
			className="flex h-screen sm:max-w-[10%] md:max-w-[20%] xl:max-w-[20%]  
		 flex-col bg-blue-50 justify-between border-r bg-background p-4 fixed left-0">
			<div className="space-y-4">
				<Link href="/home">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight hover:underline">
						MySocialApp
					</h2>
				</Link>
				<div className="space-y-1">
					<Link href="/home">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-red-400">
							<Home className="mr-2 h-8 w-8 " />
							<span className="">Home</span>
						</Button>
					</Link>
					<Link href="/user/search"></Link>
					<Button
						// onClick={() => alert("Hello World!")}
						variant="ghost"
						className="flex gap-2 w-full justify-start myInput hover:bg-red-400">
						<Search className="mr-2 h-8 w-8 sm:h-6 sm:w-6" />
						<input
							className="w-full bg-transparent focus:outline-none"
							type="text"
							placeholder="Search"
						/>

						{/* added code---------------------------- */}
						{}
					</Button>

					<Link href="/user/notifications">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-red-400">
							<Bell className="mr-2 h-8 w-8 sm:h-6 sm:w-6" />
							<span>Notifications</span>
						</Button>
					</Link>
					<Link href="/user/messages">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-red-400">
							<Mail className="mr-2 h-8 w-8 sm:h-6 sm:w-6 " />
							<span className=" invisible sm:invisible md:visible">
								Messages
							</span>
						</Button>
					</Link>
					<Link href="/user/profile">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-red-400">
							<User className="mr-2 h-8 w-8 sm:h-6 sm:w-6" />
							<span>Profile</span>
						</Button>
					</Link>
					<Link href="/user/friends">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-red-400">
							<Users className="mr-2 h-8 w-8 sm:h-6 sm:w-6" />
							<span className="fri">Friends</span>
						</Button>
					</Link>
				</div>
			</div>
			<div className="space-y-4 p-2">
				<div className="flex items-center space-x-2 rounded-md border  hover:bg-red-400">
					<Link href="/user/profile" className="flex items-center">
						<Avatar>
							<AvatarImage
								src="/cartoon-cute.jpg"
								alt="User"
							/>
							{/* <AvatarFallback>UN</AvatarFallback> */}
						</Avatar>
						<div className="flex flex-col">
							<p className="text-sm font-medium leading-none">User Name</p>
							<p className="text-sm text-muted-foreground">@username</p>
						</div>
					</Link>
				</div>
				<div className="space-y-1">
					{/* <Link href="/user/usersettings"> </Link> */}
					<Link href="/user/usersettings">
						<Button
							variant="ghost"
							className="w-full justify-start hover:bg-red-400">
							<Settings className="mr-2 h-8 w-8 sm:h-6 sm:w-6" />
							<span className="sett">Setting</span>
						</Button>
					</Link>

					<Link href="/login">
						<Button
							variant="ghost"
							className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-400">
							<LogOut className="mr-2 h-8 w-8 sm:h-6 sm:w-6" />
							<span className="logout">Log out</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

// path params vs query params
