import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth(); // login() will update user in context
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  // Load form with backend user data
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =======================
  // SAVE PROFILE TO BACKEND
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Update Context + LocalStorage
        login(data.user);

        setIsEditing(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <h2 className="p-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center sm:space-x-5">
              <img
                className="w-24 h-24 rounded-full"
                src={
                  user.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User avatar"
              />
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {user.username}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleEditToggle}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="border-t border-gray-200">
            {isEditing ? (
              // =========================
              // EDIT FORM
              // =========================
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Email (read-only)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    readOnly
                    className="w-full p-2 border bg-gray-100 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              // =========================
              // DISPLAY PROFILE INFO
              // =========================
              <dl className="p-6 space-y-4">
                <div className="grid grid-cols-3">
                  <dt className="text-gray-500">Username</dt>
                  <dd className="col-span-2">{user.username}</dd>
                </div>

                <div className="grid grid-cols-3">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="col-span-2">{user.email}</dd>
                </div>

                <div className="grid grid-cols-3">
                  <dt className="text-gray-500">My Orders</dt>
                  <dd className="col-span-2 text-indigo-600">View Orders</dd>
                </div>

                <div className="grid grid-cols-3">
                  <dt className="text-gray-500">Addresses</dt>
                  <dd className="col-span-2 text-indigo-600">Manage</dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
