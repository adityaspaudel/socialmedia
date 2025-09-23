"use client";

import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const SearchComponent2 = () => {
	const [fullName, setFullName] = useState("");
	const [results, setResults] = useState([]);
	const [followState, setFollowState] = useState({}); // follow state per user
	const { userid } = useParams();

	console.log("current user from useParams", userid);
	const handleSearch = async () => {
		if (!fullName.trim()) return;
		try {
			const { data } = await axios.get(`http://localhost:8000/search`, {
				params: { query: fullName },
			});
			setResults(data.users);

			// Initialize followState with false (not following)
			const initialFollowState = {};
			data.users.forEach((user) => {
				initialFollowState[user._id] = false;
			});
			setFollowState(initialFollowState);
		} catch (error) {
			console.error("Error searching user:", error);
			setResults([]);
		}
	};

	const toggleFollowUnfollow = async (uid) => {
		try {
			// Call backend to toggle follow/unfollow
			await fetch(`http://localhost:8000/${userid}/toggleFollowUnfollow`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ followingTo: uid }), // send any needed data
			});

			// Toggle local state
			setFollowState((prev) => ({
				...prev,
				[uid]: !prev[uid],
			}));
		} catch (error) {
			console.error("Error toggling follow/unfollow:", error);
		}
	};

	return (
		<div className="p-4">
			<input
				type="text"
				name="fullName"
				value={fullName}
				onChange={(e) => setFullName(e.target.value)}
				placeholder="Search..."
				className="border p-2 rounded"
			/>
			<button
				onClick={handleSearch}
				className="ml-2 p-2 bg-blue-500 text-white rounded"
			>
				Search
			</button>

			<ul className="mt-4">
				{results.length > 0 ? (
					results.map((user) => (
						<div key={user._id} className="flex items-center gap-4 my-2">
							<li>{user.fullName}</li>
							<button
								onClick={() => toggleFollowUnfollow(user._id)}
								className={`px-3 py-1 rounded text-white ${
									followState[user._id] ? "bg-green-600" : "bg-gray-600"
								}`}
							>
								{followState[user._id] ? "Following" : "Follow"}
							</button>
						</div>
					))
				) : (
					<li>No users found</li>
				)}
			</ul>
		</div>
	);
};

export default SearchComponent2;
