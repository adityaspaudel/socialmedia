"use client";

import React, { useState } from "react";
import axios from "axios";

const SearchComponent = () => {
	const [searchTerm, setSearchTerm] = useState(""); // Input value
	const [searchResults, setSearchResults] = useState([]); // API results
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(null); // Error state

	// Function to handle search
	const handleSearch = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get(
				`http://localhost:8000/`, // Replace with your API endpoint
				{ params: { q: searchTerm } } // Passing the search term as a query parameter
			);
			setSearchResults(response.data); // Set the results from API response
		} catch (err) {
			setError(
				err.response?.data?.message || "An error occurred while searching."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={handleSearch}
				className="w-full max-w-md p-4 bg-white rounded shadow-md">
				<h1 className="text-2xl font-bold text-center mb-4">Search API</h1>

				{/* Input Element */}
				<input
					type="text"
					placeholder="Search..."
					className="w-full px-3 py-2 mb-4 border rounded border-gray-300"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
				/>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					disabled={loading}>
					{loading ? "Searching..." : "Search"}
				</button>
			</form>

			{/* Error Handling */}
			{error && <p className="text-red-500 mt-4">{error}</p>}

			{/* Search Results */}
			<div className="w-full max-w-md mt-6">
				{searchResults.length > 0 ? (
					<ul className="list-disc pl-6">
						{searchResults.map((result, index) => (
							<li
								key={index}
								className="mb-2">
								{result.name || result.title || "Unnamed Result"}
							</li>
						))}
					</ul>
				) : (
					!loading && <p className="text-gray-600">No results found.</p>
				)}
			</div>
		</div>
	);
};

export default SearchComponent;
