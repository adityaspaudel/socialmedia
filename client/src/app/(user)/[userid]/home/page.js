"use client";

import PhotoUpload from "@/components/photo-uploader";
import ReactionButton from "@/components/reaction-button/page";
import Sidebar from "@/components/sidebar2/page";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import VideoPlayer from "@/components/videoplayer/page";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [usersList, setUsersList] = useState([]);
	const [isClient, setIsClient] = useState(false);
	const { userid } = useParams();
	// alert(JSON.stringify(userid));
	useEffect(() => {
		fetchUsersList();
		setIsClient(true);
	}, []);


	const fetchUsersList = async () => {
		// const data = await fetch("https://api.escuelajs.co/api/v1/users");
		const data = await fetch(
			`http://localhost:8000/api/${userid}/getProfilePhotos`
		);

		let usersList11 = await data.json();
		setUsersList(usersList11);
		console.log(usersList11);
	};

	return (
		<div className="flex gap-2 justify-between ">
			{/* <SocialMediaSidebarComponent /> */}
			<div className="flex justify-center gap-20 ">
				<div className="bg-blue-50 sm:w-[400px] md:w-[500px] lg:w-[600px]">
					<div className="text-center p-4">
						<div>Home</div>
						{/* image upload */}
						<PhotoUpload />

						{/* new added for hydration error */}
						{/* <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1> */}
						<div className="flex flex-col gap-12 ">
							{JSON.stringify(usersList)}
							{usersList.map((user) => (
								<div
									key={user._id}
									className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition-shadow duration-300"
								>
									<div className="relative w-full h-64">
										<img
											src={user.imageUrl}
											alt={user.description || "User image"}
											layout="fill"
											objectFit="cover"
											className="transition-transform duration-300 hover:scale-105"
										/>
									</div>
									<div className="p-4">
										<p className="text-sm text-gray-500 mb-1">
											{new Date(user.createdAt).toLocaleString()}
										</p>
										<h2 className="text-lg font-semibold text-gray-800">
											{user.description || "No description"}
										</h2>
									</div>
								</div>
							))}
						</div>
						{/* pictures rendered from  /public */}
						{/* <div className="flex flex-col gap-12 border-2 gap-12 rounded-xl">
							{Object.values(picsLink).map((item, id) => {
								return (
									<div
										className=" flex flex-col justify-center m-auto p-2 border-2 h-[600px] w-[600px] hover:border-2 hover:border-gray-400"
										key={id}>
										<Image
											className="flex flex-col h-[500px] [w-500px] justify-center object-cover"
											src={item}
											height={500}
											width={500}
										/>
									</div>
								);
							})}
						</div> */}
					</div>
					{/* <div>Home</div> */}
				</div>
				{/* <VideoPlayer /> */}
				<div className="flex flex-col bg-blue-50  w-[100px] sm:w-[200px] gap-2  p-4">
					<div className="text-center">Users you may know</div>
					<AvatarGroup className="flex flex-col" isBordered isGrid max={9}>
						<div className="bg-blue-200">
							<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026707d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
						</div>
						<div className="hover:bg-blue-200">
							<Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
						</div>
					</AvatarGroup>
				</div>
			</div>
		</div>
	);
};

export default Home;
