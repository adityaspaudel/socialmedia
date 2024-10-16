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

export function SocialMediaSidebarComponent() {
	return (
		<div
			className="flex h-screen md:max-w-[10%] xl:max-w-[20%]  
		 flex-col bg-blue-50 justify-between border-r bg-background p-4 fixed left-0">
			<div className="space-y-4">
				<Link href="/home">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						MySocialApp
					</h2>
				</Link>
				<div className="space-y-1">
					<Link href="/home">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<Home className="mr-2 h-4 w-4 " />
							Home
						</Button>
					</Link>
					<Link href="/user/search">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<Search className="mr-2 h-4 w-4" />
							Explore
						</Button>
					</Link>
					<Link href="/user/notifications">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<Bell className="mr-2 h-4 w-4" />
							Notifications
						</Button>
					</Link>
					<Link href="/user/messages">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<Mail className="mr-2 h-4 w-4" />
							<span className="md:invisible xl:visible">Messages</span>
						</Button>
					</Link>
					<Link href="/user/profile">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<User className="mr-2 h-4 w-4" />
							Profile
						</Button>
					</Link>
					<Link href="/user/friends">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<Users className="mr-2 h-4 w-4" />
							Friends
						</Button>
					</Link>
				</div>
			</div>
			<div className="space-y-4">
				<div className="flex items-center space-x-4 rounded-md border p-4">
					<Avatar>
						<AvatarImage
							src="/cartoon-cute.jpg"
							alt="User"
						/>
						{/* <AvatarFallback>UN</AvatarFallback> */}
					</Avatar>
					<div>
						<p className="text-sm font-medium leading-none">John Cena</p>
						<p className="text-sm text-muted-foreground">@johncena</p>
					</div>
				</div>
				<div className="space-y-1">
					{/* <Link href="/user/usersettings"> </Link> */}
					<Link href="/user/usersettings">
						<Button
							variant="ghost"
							className="w-full justify-start">
							<Settings className="mr-2 h-4 w-4" />
							Setting
						</Button>
					</Link>

					<Link href="/login">
						<Button
							variant="ghost"
							className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100">
							<LogOut className="mr-2 h-4 w-4" />
							Log out
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

// path params vs query params
