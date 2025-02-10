import SearchComponent2 from "@/components/search/search2";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import React from "react";

const UserSearch = () => {
	return (
		<div>
			<SocialMediaSidebarComponent />

			{/*  */}
			<div className="ml-[200px]">
				<SearchComponent2 />
			</div>
		</div>
	);
};

export default UserSearch;
