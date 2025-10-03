"use client";

import { useEffect, useState } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllUsers");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="p-6 text-gray-600">Loading users...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-4 bg-white shadow rounded-lg min-w-[200px] flex-1"
            >
              <img
                src="/default-avatar.png"
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
