import { useState } from "react";
import ImageUpload from "./ImageUpload"; // Assuming the ImageUpload component is in the same directory

const ShopRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopOwnerName, setShopOwnerName] = useState("");
  const [shopContact, setShopContact] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = (imageUrl) => {
    setShopImage(imageUrl); // Store the Cloudinary image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopImage) {
      setError("Please upload an image");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/shop/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          shopName,
          shopOwnerName,
          shopContact,
          shopImage,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        // Reset form fields
        setEmail("");
        setPassword("");
        setUsername("");
        setShopName("");
        setShopOwnerName("");
        setShopContact("");
        setShopImage("");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Shop Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Shop Owner Name:</label>
          <input
            type="text"
            value={shopOwnerName}
            onChange={(e) => setShopOwnerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Shop Contact:</label>
          <input
            type="number"
            value={shopContact}
            onChange={(e) => setShopContact(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Shop Image:</label>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>Shop and User created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default ShopRegistrationForm;
