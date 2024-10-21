import { UserSettingsSidebar } from "@/components/usersettingssidebar/page";
import React from "react";

const BlockedLists = () => {
	const bList = {
		names: [
			"Emma Thompson",
			"Liam Rodriguez",
			"Sophia Chen",
			"Noah Patel",
			"Olivia Kim",
			"Ethan Nguyen",
			"Ava Johnson",
			"Mason Williams",
			"Isabella Garcia",
			"James Smith",
		],
	};
	return (
		<div className="flex gap-4">
			<UserSettingsSidebar />
			<div className="">
				<h1 className="text-2xl font-bold">BlockedLists</h1>
				<div>
					{bList.names.map((name) => (
						<div>{name}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BlockedLists;
