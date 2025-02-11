import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileImagesPage() {
	const [images, setImages] = useState([]);

	// Fetch images from the backend
	const fetchImages = async () => {
		try {
			const response = await axios.get("http://localhost:8000/images"); // Fetch from Express backend
			// alert(JSON.stringify(response.data));
			setImages(response.data); // Update state with image URLs
		} catch (error) {
			console.log("Error fetching images:", error);
		}
	};

	// Fetch images when the component is mounted
	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-xl font-bold mb-4">Uploaded Images</h1>
			<div className="grid grid-cols-3 gap-4">
				{images.length === 0 ? (
					<p>No images uploaded yet!</p>
				) : (
					images.map((image, index) => (
						<div className="border rounded-2xl shadow-lg overflow-hidden hover:border-black border-2">
							<img
								src={image.imageUrl}
								alt={image.description}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">
									{image.description}
								</h3>
								<p className="text-sm text-gray-500">
									Uploaded: {new Date(image.createdAt).toLocaleDateString()}{" "}
									{new Date(image.createdAt).toLocaleTimeString()}
								</p>
							</div>
						</div>
					))
				)}
			</div>
			{/* {JSON.stringify(images)} */}
		</div>
	);
}
