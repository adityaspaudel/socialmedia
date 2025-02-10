import SearchComponent2 from "@/components/search/search2";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import React from "react";

const UserSearch = () => {
	return (
		<div className="flex gap-2">
			<SocialMediaSidebarComponent />

			{/*  */}

			<SearchComponent2 />
		</div>
	);
};

export default UserSearch;
