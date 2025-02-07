// worked perfectly with /multer/multer1 in backend

"use client";
import { useState } from "react";
import axios from "axios";

export default function ImageUploader() {
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const [message, setMessage] = useState("");

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file || !description) {
			setMessage("Please select a file and enter a description.");
			return;
		}

		const formData = new FormData();
		formData.append("image", file);
		formData.append("description", description);

		try {
			const response = await axios.post(
				"http://localhost:8000/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setMessage(response.data.message);
		} catch (error) {
			setMessage("Error uploading file.");
			console.error(error);
		}
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Upload an Image with Description</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Image:</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
					/>
				</div>
				<div>
					<label>Description:</label>
					<input
						type="text"
						value={description}
						onChange={handleDescriptionChange}
					/>
				</div>
				<button
					className="bg-red-400"
					type="submit">
					Upload
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
