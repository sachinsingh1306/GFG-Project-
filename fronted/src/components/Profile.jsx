import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const avatar =
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?_gl=1*o4zcd0*_ga*ODY1MDMyMTIyLjE3NTY3OTUxMjY.*_ga_8JE65Q40S6*czE3NTc2MTU2NDQkbzMkZzEkdDE3NTc2MTU2NTUkajQ5JGwwJGgw';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setForm({
      username: user?.username || '',
      email: user?.email || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/api/auth/profile', {
        username: form.username,
        email: user.email // send original email to find user
      });
      login(response.data.user);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center sm:space-x-5">
              <div className="flex-shrink-0">
                <img className="w-24 h-24 rounded-full" src={avatar} alt="User avatar" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-xl font-bold text-gray-900">{user?.username}</p>
                <p className="text-sm font-medium text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="mt-5 sm:mt-0">
              <button
                onClick={handleEditToggle}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={form.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address (cannot be changed)
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <dl className="p-6">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.username}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">My Orders</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">View Orders</a>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Addresses</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Manage Addresses</a>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Payment Methods</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Manage Payment Methods</a>
                  </dd>
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