"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function IndividualPost() {
  const { userId, postId } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/${userId}/posts/${postId}/getPostById`
      );
      setCurrentPost(data);
      console.log("Fetched Post:", data);
    } catch (error) {
      console.error("Error fetching individual post:", error);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  // ✅ Like / Unlike toggle
  const toggleLike = async (postId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/posts/${postId}/like`,
        { userId }
      );

      setCurrentPost((prev) => ({
        ...prev,
        likes: data.liked
          ? [...prev.likes, userId] // add like
          : prev.likes.filter((id) => id !== userId), // remove like
      }));
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  // ✅ Add comment
  const addComment = async () => {
    if (!commentText.trim()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:8000/posts/${currentPost._id}/comments`,
        {
          userId,
          text: commentText,
        }
      );

      setCurrentPost((prev) => ({
        ...prev,
        comments: [...prev.comments, data.comment],
      }));

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!currentPost) {
    return <p className="p-6">Loading...</p>;
  }

  const liked = currentPost.likes.includes(userId);

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow">
      <div
        className="text-2xl font-bold cursor-pointer hover:bg-slate-300 w-8"
        onClick={() => router.back()}
        title="go back"
      >
        🔙
      </div>
      <br />

      {/* Post Details */}
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
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <button
            onClick={() => toggleLike(currentPost._id)}
            className={`px-3 py-1 rounded text-white ${
              liked
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <span>
            {currentPost.likes.length}{" "}
            {currentPost.likes.length !== 1 ? "Likes" : "Like"}
          </span>
        </div>

        {/* Comments */}
        <div className="border-t pt-2 flex flex-col content-start items-start">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Comments</h3>
          <div className="flex content-start items-start flex-col">
            {currentPost.comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet</p>
            ) : (
              currentPost.comments.map((c) => (
                <div
                  key={c._id}
                  className="mb-2 flex gap-2 content-between items-center"
                >
                  <div className="flex gap-2">
                    <p className="text-sm font-semibold">{c.user.fullName}:</p>
                    <p className="text-sm text-gray-600">{c.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 flex content-end items-end">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input for new comment */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border px-3 py-1 rounded"
            />
            <button
              onClick={addComment}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
