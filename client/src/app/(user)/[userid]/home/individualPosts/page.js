"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const PostComponent = () => {
  const { userid } = useParams(); // logged-in user
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState({});

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
        author: userid,
        content,
      });
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const addComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;

    try {
      await axios.post(`http://localhost:8000/posts/${postId}/comments`, {
        userId: userid,
        text: commentText[postId],
      });
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/posts/${postId}/like`,
        {
          userId: userid,
        }
      );

      // update local posts state
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: data.liked
                  ? [...p.likes, userid]
                  : p.likes.filter((id) => id !== userid),
              }
            : p
        )
      );
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        {posts.map((post) => {
          const liked = post.likes.includes(userid);
          return (
            <div key={post._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">
                {post.author?.fullName || "Unknown"}
              </h3>
              <p className="mt-2">{post.content}</p>
              <div className="mt-2 flex items-center gap-4">
                <button
                  onClick={() => toggleLike(post._id)}
                  className={`px-3 py-1 rounded text-white ${
                    liked ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {liked ? "Liked" : "Like"} ({post.likes.length})
                </button>
              </div>
              <div className="mt-4 flex flex-col content-start items-start">
                <h4 className=" font-bold underline">Comments:</h4>
                <ul className="pl-4 list-none flex flex-col content-start items-start">
                  {post.comments?.map((c) => (
                    <li key={c._id}>
                      <strong>{c.user?.fullName || "User"}:</strong> {c.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
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
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => addComment(post._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Comment
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostComponent;
