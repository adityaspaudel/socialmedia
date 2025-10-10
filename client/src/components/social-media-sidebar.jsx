"use client";

import { FaConnectdevelop, FaUserAlt } from "react-icons/fa";
import {
  IoHomeSharp,
  IoLogOut,
  IoSettings,
  IoSettingsSharp,
} from "react-icons/io5";
import { RiSearchFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { LogOut } from "lucide-react";

export function SocialMediaSidebarComponent() {
  const params = useParams();
  const { userId } = params; // ✅ extract userId from route
  const [user, setUser] = useState(null);

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/users/${userId}`
        );
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  return (
    <div
      className="flex flex-col left-0 top-0 sticky h-screen w-[80px] sm:w-[100px] md:w-[100px] xl:w-[350px]  
		  bg-green-100 justify-between border-r p-4"
    >
      <div className="space-y-4 w-full ">
        <Link href={`/${userId}/home`} className="flex gap-2 px-4">
          <FaConnectdevelop className="text-2xl" />
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight hover:underline hidden md:block">
            Mero Sanjal
          </h2>
        </Link>

        {/* Nav links */}
        <div className="space-y-1">
          <Link href={`/${userId}/home`}>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100"
            >
              <IoHomeSharp />
              <span className="hidden md:block">Home</span>
            </Button>
          </Link>
          <Link href={`/${userId}/search`}>
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start hover:bg-gray-100"
            >
              <RiSearchFill />
              <input
                className="w-full bg-transparent focus:outline-none hidden md:block"
                type="text"
                placeholder="Search"
              />
            </Button>
          </Link>
          <Link href={`/${userId}/notifications`}>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100"
            >
              <FaBell />
              <span className="hidden md:block">Notifications</span>
            </Button>
          </Link>
          <Link href={`/${userId}/messages`}>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100"
            >
              <IoMail />
              <span className=" hidden md:block">Messages</span>
            </Button>
          </Link>
          <Link href={`/${userId}/profile`}>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100"
            >
              <FaUserAlt />
              <span className="hidden md:block">Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* User info + settings */}
      <div className="space-y-1 p-2">
        {user && (
          <div className="flex items-center space-x-2 rounded-md border hover:bg-gray-100">
            <Link
              href={`/${userId}/profile`}
              className="flex items-center gap-2"
            >
              <Avatar>
                <AvatarImage src="/cartoon-cute.jpg" alt={user.fullName} />
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none hidden md:block">
                  {user.fullName}
                </p>
                <p className="text-sm text-muted-foreground hidden md:block">
                  @{user.email.split("@")[0]}
                </p>
              </div>
            </Link>
          </div>
        )}

        <div>
          <Link href={`/${userId}/userSettings`}>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100"
            >
              <IoSettingsSharp />
              <span className="logout hidden md:block">Setting</span>
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-gray-100 font-bold"
            >
              <IoLogOut />
              <span className="logout hidden md:block">Logout</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
