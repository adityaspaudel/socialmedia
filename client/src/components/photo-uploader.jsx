"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const { userId } = useParams(); // Get userId from URL params

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description || !userId) {
      setMessage(
        "Please select a file, enter a description, and ensure user ID is present."
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("userId", userId); // Include userId from useParams

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Error uploading file.");

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload an Image with Description</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button className="bg-red-400 p-2 text-white rounded-2xl" type="submit">
          Upload
        </button>
      </form>
      <div className="text-green-400">{message && <p>{message}</p>}</div>
    </div>
  );
}
