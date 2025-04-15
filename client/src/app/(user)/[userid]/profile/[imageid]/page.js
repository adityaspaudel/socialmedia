"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const IndividualProfilePhotos = () => {
  const { imageid } = useParams();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/images/${imageid}`);
        if (!res.ok) {
          throw new Error("Image not found");
        }
        const data = await res.json();
        console.log("Fetched Image:", data);
        setImageData(data);
      } catch (err) {
        console.error("Failed to fetch image:", err);
      } finally {
        setLoading(false);
      }
    };

    if (imageid) fetchImage();
  }, [imageid]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {loading ? (
        <p>Loading image...</p>
      ) : imageData ? (
        <>
          <img
            src={imageData.imageUrl}
            alt={imageData.description}
            className="rounded-lg shadow-lg max-w-full h-auto mb-4"
          />
          <p className="text-lg font-semibold">{imageData.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Uploaded by: {imageData.user?.username || "Unknown"}
          </p>
        </>
      ) : (
        <p>Image not found.</p>
      )}
    </div>
  );
};

export default IndividualProfilePhotos;
