import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("cart");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">
        <h3>{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
