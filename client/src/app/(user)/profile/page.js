import PhotosPage from "@/components/profile-all-photo";
import Sidebar from "@/components/sidebar/page";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserProfile = () => {
	return (
		<div className="flex gap-4 text-sm bg-blue-100">
			{/* left-sidebar -----------------------------------------*/}
			<div>
				{/* <Sidebar className="" /> */}
				{/* <SocialMediaSidebarComponent /> */}
				<PhotosPage />
			</div>
		</div>
	);
};

export default UserProfile;
