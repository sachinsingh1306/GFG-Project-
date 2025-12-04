import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../schema/User.js";


const AuthController = express();

// Register
AuthController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
AuthController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

AuthController.put("/profile", async (req, res) => {
  try {
    const { username, email } = req.body; // email is used to find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username;
    await user.save();
    
    res.status(200).json({
      message: "Profile updated successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user profile
AuthController.get("/profile/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar || "https://via.placeholder.com/150",
  });
});

// ---------------------- ADDED SHIPPING ROUTE ----------------------
AuthController.post("/shipping", async (req, res) => {
  try {
    const { firstName, lastName, address, city, state, zip } = req.body;

    console.log("Shipping Data Received:", req.body);

    res.status(201).json({
      message: "Shipping Data Saved Successfully",
      data: req.body,
    });
  } catch (error) {
    console.error("Shipping Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default AuthController;