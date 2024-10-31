"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	UserCircle,
	Bell,
	Lock,
	Users,
	UserX,
	MessageCircle,
	Heart,
	LogOut,
} from "lucide-react";
import Image from "next/image";

export function UserSettingsSidebar({ className }) {
	return (
		<div>
			<Link
				className="font-bold text-2xl  hover:underline"
				href="/home">
				<h1>MySocialApp</h1>
			</Link>
			<Card className={cn("w-[300px] h-screen", className)}>
				<CardHeader>
					<CardTitle>Settings</CardTitle>
					<CardDescription>
						Manage your account settings and preferences.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[calc(100vh-12rem)]">
						<div className="flex items-center mb-4 space-x-4">
							<Avatar>
								{/* <AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/> */}
								<Image
									src="/cartoon-cute.jpg"
									height={100}
									width={100}
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm font-medium leading-none">Username</p>
								<p className="text-sm text-muted-foreground">@username</p>
							</div>
						</div>
						<div className="space-y-1">
							<button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/settings/profile">
									<UserCircle className="mr-2 h-4 w-4" />
									Edit Profile
								</Link>
							</button>
							<Button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/settings/notifications">
									<Bell className="mr-2 h-4 w-4" />
									Notifications
								</Link>
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/settings/privacy">
									<Lock className="mr-2 h-4 w-4" />
									Account Privacy
								</Link>
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/settings/close-friends">
									<Users className="mr-2 h-4 w-4" />
									Close Friends
								</Link>
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/user/blockedLists">
									<UserX className="mr-2 h-4 w-4" />
									Blocked Accounts
								</Link>
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/settings/comments">
									<MessageCircle className="mr-2 h-4 w-4" />
									Comments
								</Link>
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
								asChild>
								<Link href="/settings/likes">
									<Heart className="mr-2 h-4 w-4" />
									Likes
								</Link>
							</Button>
						</div>
					</ScrollArea>
				</CardContent>
				<CardFooter>
					<Link href="/login">
						<Button
							variant="destructive"
							className="w-full">
							<LogOut className="mr-2 h-4 w-4" />
							Log out
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
