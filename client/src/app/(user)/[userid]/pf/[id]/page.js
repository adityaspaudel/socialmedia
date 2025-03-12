"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams(); // Get dynamic ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // alert(id);
  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.fullName}'s Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
