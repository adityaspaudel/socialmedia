"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function UserProfile() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({}); // track input per-post

  // Fetch all posts for user
  useEffect(() => {
    if (!userId) return;
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/user/${userId}`
        );
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };
    fetchPosts();
  }, [userId]);

  // ✅ Toggle Like
  const toggleLike = async (postId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/posts/${postId}/like`,
        { userId }
      );

      // Optimistic UI update
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: data.liked
                  ? [...p.likes, userId] // add like
                  : p.likes.filter((id) => id !== userId), // remove like
              }
            : p
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // ✅ Add Comment
  const addComment = async (postId) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:8000/posts/${postId}/comments`,
        { userId, text }
      );

      // Optimistic UI update
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: [...p.comments, data.comment] }
            : p
        )
      );

      // clear input after posting
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Posts</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 mb-6 border border-gray-200"
          >
            {/* Author + Date */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">
                  {post.author?.fullName?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {post.author?.fullName || "Unknown User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

            {/* Likes Section */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <span>
                👍 {post.likes?.length || 0}{" "}
                {post.likes?.length === 1 ? "Like" : "Likes"}
              </span>
              <button
                onClick={() => toggleLike(post._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {post.likes?.includes(userId) ? "Unlike" : "Like"}
              </button>
            </div>

            {/* Comments */}
            <div className="border-t pt-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Comments
              </h3>
              {post.comments?.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet</p>
              ) : (
                post.comments.map((c) => (
                  <div key={c._id} className="mb-2">
                    <p className="text-sm font-semibold">
                      {c.user?.fullName || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-600">{c.text}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}

              {/* Add Comment */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [post._id]: e.target.value,
                    }))
                  }
                  className="flex-1 border px-3 py-1 rounded"
                />
                <button
                  onClick={() => addComment(post._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
}
