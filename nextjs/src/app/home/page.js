"use client";
import Sidebar from "@/components/sidebar2/page";
import VideoPlayer from "@/components/videoplayer/page";
import Image from "next/image";
import React from "react";

const Home = () => {
	return (
		<div>
		
			<Sidebar />
			<div>Home</div>
			{/* <VideoPlayer /> */}
		</div>
	);
};

export default Home;
