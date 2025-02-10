// Frontend - page.js (Next.js)
"use client";

import { useState } from "react";
import axios from "axios";

const SearchComponent2 = () => {
	const [fullName, setFullName] = useState("");
	const [results, setResults] = useState([]);

	const handleSearch = async () => {
		if (!fullName.trim()) return;
		try {
			const { data } = await axios.get(`http://localhost:8000/search`, {
				params: { query: fullName },
			});
			setResults(data.users); // Set the result array from the response
		} catch (error) {
			console.error("Error searching user:", error);
			setResults([]); // Clear results on error
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
				className="ml-2 p-2 bg-blue-500 text-white rounded">
				Search
			</button>
			<ul className="mt-4">
				{results.length > 0 ? (
					results.map((user, idx) => (
						<li key={idx}>{user.fullName}</li> // Display the user's fullName
					))
				) : (
					<li>No users found</li>
				)}
			</ul>
		</div>
	);
};

export default SearchComponent2;
