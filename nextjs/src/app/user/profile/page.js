import Sidebar from "@/components/sidebar2/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserProfile = () => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col ml-[20%] w-full">
				<div className="w-[100%] bg-red-100 text-black">
					<div className="flex p-12 gap-12">
						<div className="w-[20%]  bg-red-600">
							<Image
								className="rounded-full"
								src="/cartoon-cute.jpg"
								height={200}
								width={200}
							/>
						</div>
						<div className="flex flex-col  w-[80%] gap-8 list-none">
							<div className=" flex flex-col gap-12 bg-blue-300 ">
								<div className="flex flex-col gap-2">
									<li className=" text-3xl font-bold">John Cena</li>
									<li className="italic">@Username</li>
								</div>
								<div className="flex gap-12">
									<Link href="/user/editprofile">
										<li>Edit profile</li>
									</Link>
									<Link href="/user/usersetting">
										<li>setting</li>
									</Link>
								</div>
							</div>
							<div className="flex flex-col gap-12  bg-pink-300">
								<li>Information</li>
								<li>Interest</li>
							</div>
							<div className="flex gap-12  bg-green-300">
								<li>posts</li>
								<Link href="/user/following">
									<li>following</li>
								</Link>
								<Link href="/user/followers">
									<li>followers</li>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="flex w-full flex-wrap gap-8 bg-yellow-100 text-black list-none">
					<li className="w-[30%] p-8  bg-green-600">
						<Image
							className="m-auto"
							src="/connect-kura.png"
							height={200}
							width={200}
						/>
					</li>
					<li className="w-[30%] p-8 bg-green-600">
						<Image
							className="m-auto"
							src="/connect-kura.png"
							height={200}
							width={200}
						/>
					</li>
					<li className="w-[30%] p-8 bg-green-600">
						<Image
							className="m-auto"
							src="/connect-kura.png"
							height={200}
							width={200}
						/>
					</li>
					<li className="w-[30%] p-8 bg-green-600">
						<Image
							className="m-auto"
							src="/connect-kura.png"
							height={200}
							width={200}
						/>
					</li>
					<li className="w-[30%] p-8 bg-green-600">
						<Image
							className="m-auto"
							src="/connect-kura.png"
							height={200}
							width={200}
						/>
					</li>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
