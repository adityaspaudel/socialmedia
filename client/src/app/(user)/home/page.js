"use client";

import PhotoUpload from "@/components/photo-uploader";
import ReactionButton from "@/components/reaction-button/page";
import Sidebar from "@/components/sidebar2/page";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import VideoPlayer from "@/components/videoplayer/page";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [usersList, setUsersList] = useState([]);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		fetchUsersList();
		setIsClient(true);
	}, []);

	const picsLink = {
		img1: "/cartoon-cute.jpg",
		img2: "/cartoon-1.jpg",
		img3: "/cartoon-2.jpg",
		img4: "/cartoon-cute.jpg",
		img5: "/cartoon-3.jpg",
		img6: "/cartoon-4.jpg",
		img7: "/connect-kura.png",
	};

	const fetchUsersList = async () => {
		const data = await fetch("https://api.escuelajs.co/api/v1/users");
		let usersList11 = await data.json();
		setUsersList(usersList11);
	};

	return (
		<div className="flex gap-2 justify-between ">
			<SocialMediaSidebarComponent />
			<div className="flex justify-center gap-20 ">
				<div className="bg-blue-50 sm:w-[400px] md:w-[500px] lg:w-[600px]">
					<div className="text-center p-4">
						<div>Home</div>
						{/* image upload */}
						<PhotoUpload />

						{/* new added for hydration error */}
						{/* <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1> */}
						<div className="flex flex-col gap-12 ">
							{Object.values(usersList).map((item, id) => {
								return (
									<div
										className="border-2 p-2 hover:border-gray-400 rounded-sm"
										key={id}>
										<div className="flex flex-col items-center gap-4 justify-between">
											<div className="flex gap-2 w-full">
												<div className="">
													<img
														className="object-cover rounded-3xl"
														src={item.avatar}
														height={50}
														width={50}
													/>
												</div>
												<div className="italic font-bold px-2">
													{item.email}
												</div>
												<div className="flex w-full gap-2 px-2 justify-end">
													{item.creationAt}

													<Ellipsis />
												</div>
											</div>
											<div>
												<img
													className="object-cover"
													src={item.avatar}
													height={400}
													width={400}
												/>
											</div>
											<div className="flex gap-2 justify-start w-full">
												<ReactionButton />
											</div>
											<div className="flex w-full justify-start p-2">
												<div className="">
													<img
														className="object-cover rounded-3xl"
														src={item.avatar}
														height={50}
														width={50}
													/>
												</div>
												<div className="italic font-bold px-2">
													{item.email}
												</div>
												<div>{item.name}</div>
											</div>
										</div>
									</div>
								);
							})}
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
					<AvatarGroup
						className="flex flex-col"
						isBordered
						isGrid
						max={9}>
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
