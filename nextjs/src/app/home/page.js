"use client";
import Sidebar from "@/components/sidebar2/page";
import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import VideoPlayer from "@/components/videoplayer/page";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import Image from "next/image";
import React from "react";

const Home = () => {
	return (
		<div className="flex gap-4 ">
			<SocialMediaSidebarComponent />
			<div className="bg-blue-50 ml-[370px] w-[40%]">
				<div className="text-center p-4">
					<div>Home</div>

					<div className="flex flex-col gap-4">
						<div>
							<Image
								src="/cartoon-cute.jpg"
								alt="cartoon-cute"
								width={600}
								height={400}
							/>
						</div>
						<div>
							<Image
								src="/cartoon-1.jpg"
								alt="cartoon-cute"
								width={600}
								height={400}
							/>
						</div>
						<div>
							<Image
								src="/cartoon-2.jpg"
								alt="cartoon-cute"
								width={600}
								height={400}
							/>
						</div>
						<div>
							<Image
								src="/cartoon-cute.jpg"
								alt="cartoon-cute"
								width={600}
								height={400}
							/>
						</div>
						<div>
							<Image
								src="/cartoon-3.jpg"
								alt="cartoon-cute"
								width={600}
								height={400}
							/>
						</div>
						<div>
							<Image
								src="/cartoon-4.jpg"
								alt="cartoon-cute"
								width={600}
								height={400}
							/>
						</div>
					</div>
				</div>

				{/* <div>Home</div> */}
			</div>
			{/* <VideoPlayer /> */}

			<div className="flex flex-col  w-[30%] gap-2 bg-blue-50 p-4 fixed right-0">
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
