import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileImagesPage() {
	const [images, setImages] = useState([]);

	// Fetch images from the backend
	const fetchImages = async () => {
		try {
			const response = await axios.get("http://localhost:8000/images"); // Fetch from Express backend
			alert(JSON.stringify(response.data));
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
						<div key={index}>
							<img
								src={image.imageUrl}
								alt={`Uploaded ${index}`}
								className="w-full h-40 object-cover rounded shadow"
							/>
						</div>
					))
				)}
			</div>
			{JSON.stringify(images[0].imageUrl)}
		</div>
	);
}
