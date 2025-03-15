import React, { useState } from "react";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file
    }
  };

  const uploadImageToCloudinary = async (file) => {
    setLoading(true);
    setError(null);

    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your-upload-preset"); // Cloudinary upload preset

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onImageUpload(data.secure_url); // Send the image URL to parent component
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (image) {
      uploadImageToCloudinary(image);
    } else {
      setError("Please select an image");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <p>Image selected: {image.name}</p>}
      <button onClick={handleUploadClick} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
