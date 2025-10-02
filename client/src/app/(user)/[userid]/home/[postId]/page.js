"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function IndividualPost() {
  const { userId, postId } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/${userId}/posts/${postId}/getPostById`
      );
      setPost(data); // ✅ backend sends raw post
      console.log("Fetched Post:", data);
    } catch (error) {
      console.error("Error fetching individual post:", error);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Post Details</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(post, null, 2)}
      </pre>
    </div>
  );
}
