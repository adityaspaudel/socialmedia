"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("http://localhost:8000/photos"); // Replace with your API URL
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link href={`/photos/${photo._id}`} key={photo._id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-medium mt-2">{photo.title}</h2>
              <p className="text-sm text-gray-600">{photo.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
