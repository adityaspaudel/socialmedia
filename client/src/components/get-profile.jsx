"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useRouter to get dynamic URL params
import Link from "next/link";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);

  const params = useParams(); // Get dynamic userid from the URL
  const { userid } = params;
  console.log("parameter", JSON.stringify(params));

  useEffect(() => {
    if (userid) {
      // Ensure the userid is available before making the API request
      const fetchPhotos = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/${userid}/getProfilePhotos`
          ); // Use the dynamic userid in the API URL
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };

      fetchPhotos();
    }
  }, [userid]); // Run the effect when the userid changes

  if (!userid) {
    // Return a loading state or fallback until the `userid` is available
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link href={`/photos/${userid}/${photo._id}`} key={photo._id}>
            {/* Pass userid in the link */}
            <div className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
              <img
                src={photo.imageUrl}
                alt={photo.description} // Use description as alt text
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-medium mt-2">{photo.description}</h2>
              <p className="text-sm text-gray-600">{photo.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
