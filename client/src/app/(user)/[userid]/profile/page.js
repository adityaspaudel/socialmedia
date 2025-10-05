"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({}); // track input per post
  const [loading, setLoading] = useState(true);

  // Fetch profile (user info + posts)
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8000/users/${userId}/profile`
        );
        setUser(data.user);
        setPosts(data.posts);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Toggle like
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
                  ? [...p.likes, userId]
                  : p.likes.filter((id) => id !== userId),
              }
            : p
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Add comment
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

      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <p className="text-gray-600">Loading profile...</p>;
  if (!user) return <p className="text-red-500">User not found</p>;

  return (
    <div className="p-6 min-h-screen bg-green-100">
      {/* User Info */}
      <div className="mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-300 flex items-center justify-center text-blue-700 font-bold text-2xl">
          {user.fullName?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* User Posts */}
      {posts.length > 0 ? (
        posts.map((post) => {
          const liked = post.likes?.includes(userId);

          return (
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
                      {post.author?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Likes */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <button
                  onClick={() => toggleLike(post._id)}
                  className={`px-3 py-1 rounded text-white ${
                    liked
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {liked ? "Unlike" : "Like"}
                </button>
                <span>
                  {post.likes?.length || 0}{" "}
                  {post.likes?.length === 1 ? "Like" : "Likes"}
                </span>
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
                    <div key={c._id} className="mb-2 flex gap-2">
                      <div className="flex gap-2">
                        <p className="text-sm font-semibold">
                          {c.user.fullName}:
                        </p>
                        <p className="text-sm text-gray-600">{c.text}</p>
                      </div>
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
          );
        })
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
}
