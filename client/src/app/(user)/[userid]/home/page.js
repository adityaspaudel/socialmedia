"use client";

import React, { useEffect, useState } from "react";

import PhotoUpload from "@/components/photo-uploader";
import PostComponent from "@/components/postComponent";
import Link from "next/link";

import { useParams } from "next/navigation";

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
            {/* <PhotoUpload /> */}
            <PostComponent />
            {/* new added for hydration error */}
            {/* <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1> */}
            <div className="flex flex-col gap-12 ">
              userList: {JSON.stringify(usersList)}
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
      </div>
    </div>
  );
};

export default Home;
