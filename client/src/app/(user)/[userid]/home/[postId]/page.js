"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function IndividualPost() {
  const { userId, postId } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/${userId}/posts/${postId}/getPostById`
      );

      setCurrentPost(data); // ✅ backend sends raw post
      console.log("Fetched Post:", data);
    } catch (error) {
      console.error("Error fetching individual post:", error);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  if (!currentPost) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Post Details</h2>
      {currentPost && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow border">
          {/* Author & Date */}
          <div className="mb-2">
            <h2 className="text-lg font-bold text-gray-800">
              {currentPost.author.fullName}
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(currentPost.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Post Content */}
          <p className="text-gray-700 mb-4">{currentPost.content}</p>

          {/* Likes */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            👍 {currentPost.likes.length} Like
            {currentPost.likes.length !== 1 ? "s" : ""}
          </div>

          {/* Comments */}
          <div className="border-t pt-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Comments
            </h3>
            {currentPost.comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet</p>
            ) : (
              currentPost.comments.map((c) => (
                <div key={c._id} className="mb-2">
                  <p className="text-sm font-semibold">{c.user.fullName}</p>
                  <p className="text-sm text-gray-600">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
