import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import React from "react";

const UserNotifications = () => {
	return (
		<div className="flex gap-2">
			<SocialMediaSidebarComponent />

			<div className="absolute left-[20%] w-80% p-4 bg-blue-100">
				<div className="text-2xl font-bold">User Notifications</div>
				<div className="flex flex-col">
					<div>Follows you Likes </div>
					<div>comments on one of your posts</div>{" "}
					<div>Mentions you in a comment Sends you a message</div>{" "}
					<div>Goes live</div>
					<div>Comments on one of your posts</div>
				</div>
			</div>
		</div>
	);
};

export default UserNotifications;
