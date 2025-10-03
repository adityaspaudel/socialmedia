"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const PostComponent = () => {
  const { userId } = useParams(); // logged-in user
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/posts");
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const createPost = async () => {
    if (!content.trim()) return;
    try {
      await axios.post("http://localhost:8000/posts", {
        author: userId,
        content,
      });
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // ✅ Like / Unlike
  const toggleLike = async (postId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/posts/${postId}/like`,
        { userId }
      );

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

  // ✅ Add comment
  const addComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:8000/posts/${postId}/comments`,
        {
          userId,
          text: commentText[postId],
        }
      );

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
 
  return (
    <div className="p-6 w-full mx-auto">
      {/* Create Post */}
      <div className="mb-6 w-full">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a post..."
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={createPost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => {
          const liked = post.likes.includes(userId);
          return (
            <div
              key={post._id}
              className="flex flex-col gap-2 border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <Link
                href={`/${userId}/home/${post._id}`}
                title="Open post"
                className="block  "
              >
                <div className="flex flex-col content-start items-start">
                  <h3 className="font-semibold text-gray-800 text-4xl">
                    {post.author?.fullName || "Unknown"}
                  </h3>
                  <p className="flex flex-col  text-gray-500 ">
                    {" "}
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="mt-2 text-gray-900 text-2xl flex flex-col content-start items-start">
                  {post.content}
                </p>
              </Link>

              {/* Likes */}
              <div className="mt-3 flex flex-start items-start gap-4 text-sm text-gray-600">
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
                  {post.likes.length}{" "}
                  {post.likes.length === 1 ? "Like" : "Likes"}
                </span>
              </div>
              <hr className="border-gray-300 border-1"/>

              {/* Comments */}
              <div className="mt-4 flex flex-col content-start items-start">
                <h4 className="font-bold underline mb-2 text-gray-600">
                  Comments:
                </h4>
                <ul className="pl-4 flex flex-col content-start items-start gap-2">
                  {post.comments?.map((c) => (
                    <li
                      key={c._id}
                      className="flex gap-2 content-between items-center"
                    >
                      <div className="flex gap-2">
                        <strong>{c.user?.fullName || "User"}:</strong> {c.text}
                      </div>
                      <span className="text-xs text-slate-500 flex flex-col content-end items-end">
                        {" "}
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Add Comment */}
                <div className="mt-2 flex gap-2">
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
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    onClick={() => addComment(post._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostComponent;
