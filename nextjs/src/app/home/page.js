"use client";
import Sidebar from "@/components/sidebar2/page";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import VideoPlayer from "@/components/videoplayer/page";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [usersList, setUsersList] = useState([]);
	useEffect(() => {
		fetchUsersList();
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
		<div className="flex gap-4 justify-center ">
			<SocialMediaSidebarComponent />
			<div className="bg-blue-50  sm:w-[600px]">
				<div className="text-center p-4">
					<div>Home</div>
					<div>
						{Object.values(usersList).map((item) => {
							return (
								<div>
									<h2>{item.id}</h2>
									<div className="flex gap-4 justify-between">
										<div className="flex gap-2">
											<div className="italic  font-bold">{item.email}</div>
											<div></div>
											{item.name}
										</div>
										{/* <div>
											<Image
												src={item.avatar}
												height={50}
												width={50}
											/>
										</div> */}

										<div>
											<Ellipsis />
										</div>
									</div>
								</div>
							);
						})}
					</div>
					{/* pictures rendered from  /public */}
					<div className="flex flex-col gap-4">
						{Object.values(picsLink).map((item, id) => {
							return (
								<div key={id}>
									<Image
										src={item}
										height={600}
										width={600}
									/>
								</div>
							);
						})}
					</div>
				</div>

				{/* <div>Home</div> */}
			</div>
			{/* <VideoPlayer /> */}

			<div className="flex flex-col  w-[200px] gap-2 bg-blue-50 p-4 ">
				<div className="text-center">users you may know</div>
				<AvatarGroup
					className="flex flex-col"
					isBordered
					isGrid
					max={9}>
					<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
					<Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
					<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
					<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
					<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
					<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
					<Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026707d" />
					<Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
					<Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
				</AvatarGroup>
			</div>
		</div>
	);
};

export default Home;
