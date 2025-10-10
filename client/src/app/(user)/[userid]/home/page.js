"use client";

import React, { useEffect, useState } from "react";

import PhotoUpload from "@/components/photo-uploader";
import PostComponent from "@/components/postComponent";
import Link from "next/link";

import { useParams } from "next/navigation";

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const { userId } = useParams();

  // alert(JSON.stringify(userId));
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full bg-green-100 p-4">
      <div className="font-bold text-2xl flex flex-col content-center items-center">
        Home
      </div>
      <PostComponent />
    </div>
  );
};

export default Home;
