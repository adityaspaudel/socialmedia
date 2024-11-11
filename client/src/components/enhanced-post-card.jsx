"use client";

import { useState, useRef, useEffect } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ThumbsUp,
	MessageCircle,
	Share2,
	MoreHorizontal,
	Send,
} from "lucide-react";

export function EnhancedPostCardComponent({
	post = {
		id: "1",
		user: {
			name: "John Doe",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		content:
			"Just had an amazing day at the beach! The sunset was absolutely breathtaking. 🏖️🌅 #summervibes #beachlife",
		image: "/placeholder.svg?height=300&width=500",
		timestamp: "2 hours ago",
		likes: 42,
		comments: [
			{
				user: "Jane Smith",
				content: "Looks amazing! 😍",
				avatar: "/placeholder.svg?height=30&width=30",
			},
			{
				user: "Mike Johnson",
				content: "Wish I was there!",
				avatar: "/placeholder.svg?height=30&width=30",
			},
		],
	},
}) {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(post.likes);
	const [commentText, setCommentText] = useState("");
	const [showComments, setShowComments] = useState(false);
	const commentInputRef = useRef(null);

	const handleLike = () => {
		setLiked(!liked);
		setLikeCount(liked ? likeCount - 1 : likeCount + 1);
	};

	const handleComment = () => {
		if (commentText.trim()) {
			// In a real app, you'd send this to your backend
			console.log("New comment:", commentText);
			setCommentText("");
		}
	};

	useEffect(() => {
		if (showComments) {
			commentInputRef.current?.focus();
		}
	}, [showComments]);

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex items-center gap-4">
					<Avatar>
						<AvatarImage
							src={post.user.avatar}
							alt={post.user.name}
						/>
						<AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="font-semibold">{post.user.name}</p>
						<p className="text-sm text-muted-foreground">{post.timestamp}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">More options</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Save post</DropdownMenuItem>
						<DropdownMenuItem>Report</DropdownMenuItem>
						<DropdownMenuItem>Unfollow</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-sm sm:text-base">{post.content}</p>
				{post.image && (
					<img
						src={post.image}
						alt="Post image"
						className="w-full h-auto rounded-lg object-cover"
					/>
				)}
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<div className="flex justify-between w-full">
					<Button
						variant="ghost"
						size="sm"
						className={`flex items-center gap-1 transition-colors duration-200 ${
							liked ? "text-blue-600" : ""
						}`}
						onClick={handleLike}>
						<ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
						<span>{likeCount}</span>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-1"
						onClick={() => setShowComments(!showComments)}>
						<MessageCircle className="h-4 w-4" />
						<span>{post.comments.length}</span>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-1">
						<Share2 className="h-4 w-4" />
						<span>Share</span>
					</Button>
				</div>
				{showComments && (
					<div className="w-full space-y-4">
						<div className="space-y-2">
							{post.comments.map((comment, index) => (
								<div
									key={index}
									className="flex items-start gap-2">
									<Avatar className="w-6 h-6">
										<AvatarImage
											src={comment.avatar}
											alt={comment.user}
										/>
										<AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className="flex-1 bg-muted p-2 rounded-lg">
										<p className="text-sm font-semibold">{comment.user}</p>
										<p className="text-sm">{comment.content}</p>
									</div>
								</div>
							))}
						</div>
						<div className="flex items-center gap-2">
							<Avatar className="w-8 h-8">
								<AvatarImage
									src="/placeholder.svg?height=32&width=32"
									alt="Your avatar"
								/>
								<AvatarFallback>Y</AvatarFallback>
							</Avatar>
							<div className="flex-1 flex items-center gap-2">
								<Textarea
									ref={commentInputRef}
									placeholder="Write a comment..."
									value={commentText}
									onChange={(e) => setCommentText(e.target.value)}
									className="min-h-0 h-9 py-2 resize-none"
									maxLength={500}
								/>
								<Button
									size="icon"
									onClick={handleComment}
									disabled={!commentText.trim()}>
									<Send className="h-4 w-4" />
									<span className="sr-only">Send comment</span>
								</Button>
							</div>
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
