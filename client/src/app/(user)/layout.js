import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import React from "react";

const UserLayout = ({ children }) => {
	return (
		<div className="flex">
			<SocialMediaSidebarComponent />
			{children}
		</div>
	);
};

export default UserLayout;
