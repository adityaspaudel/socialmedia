"use client";

import React, { useState } from "react";

const RecoverAccount = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter a valid email address.");
    } else {
      alert(`Recovery email submitted: ${email}`);
    }
  };

  return (
    <div className="flex justify-center items-center bg-green-100 h-screen w-screen">
      <div className="flex flex-col justify-center items-center gap-4 h-1/2 w-1/2  p-4 bg-gray-100 border-gray-200 border-2 rounded-xl">
        <h2 className="text-2xl font-bold">Recover Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Enter your recovery email</label>
            <input
              className="p-2"
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="h-12 w-20 p-2 bg-red-600 rounded-md text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverAccount;
