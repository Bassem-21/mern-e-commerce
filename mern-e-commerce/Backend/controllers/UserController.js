import express from "express";
import { User } from "../models/User.js";
import { Like } from "../models/Like.js";
import mongoose from "mongoose";
import authMiddleware from "../middleware/auth-middleware.js";
import bcrypt from "bcrypt";
import signToken from "../utils/signToken.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("UserController handled this request!");
});

router.get("/find-user/:id", authMiddleware, async (req, res) => {
  const userId = req.params.id;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;
  let dataRes = [];

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        errors: null,
        message: "User not found!",
        data: null,
      });
    }

    const likes = await Like.find({ user: new mongoose.Types.ObjectId(userId) })
      .skip(skip)
      .limit(limit);

    dataRes = user.toObject();
    delete dataRes.password;

    res.status(200).json({
      errors: null,
      message: "User found!",
      data: {
        user: dataRes,
        likes,
      },
    });
  } catch (err) {
    console.error("ERROR: " + err.message);
    res.status(500).json({
      errors: err.message,
      message: "An error occurred!",
      data: null,
    });
  }
});

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name: name,
    password: password,
    email: email
})
  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;

  try {
    await user.save();

    res.status(200).json({
      errors: null,
      message: "User was created successfully!",
      data: signToken(user),
    });
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
      message: "Something went wrong!",
      data: null,
    });
    return;
  }
});

router.put("/update", async (req, res) => {
  const { email, password } = req.body;
  let dataRes = [];
  try {
    if (!email || !password) {
      res.status(404).json({
        errors: [{ message: "Email and password are required!" }],
        message: "Failed to update user!",
        data: null,
      });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { email, password },
      { new: true }
    );
    dataRes = user.toObject();
    delete dataRes.password;
    if (!user) {
      return res.status(404).json({
        errors: [{ message: "User not found!" }],
        message: "Failed to update user!",
        data: null,
      });
    }

    res.status(200).json({
      errors: null,
      message: "User was updated successfully!",
      data: dataRes,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error],
      message: "Something went wrong!",
      data: null,
    });
    return;
  }
});

router.delete("/delete", authMiddleware, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(404).json({
      errors: [{ message: "ID is required!" }],
      message: "Failed to delete user!",
      data: null,
    });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        errors: [{ message: "User not found!" }],
        message: "Failed to delete user!",
        data: null,
      });
    }

    res.status(200).json({
      errors: null,
      message: "User was deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      errors: [err],
      message: "Something went wrong!",
      data: null,
    });
    return;
  }
});

//login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(400).json({
      errors: [{ message: "Email and password are required!" }],
      message: "Failed to login!",
      data: null,
    });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        errors: [{ message: "User not found!" }],
        message: "Failed to login!",
        data: null,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        errors: [{ message: "Invalid credentials!" }],
        message: "Failed to login!",
        data: null,
      });
    }

    res.status(200).json({
      errors: null,
      message: "User logged in successfully!",
      data: signToken(user),
    });
  } catch (err) {
    console.error("ERROR: " + err.message);
    res.status(500).json({
      errors: [err.message],
      message: "Failed to login!",
      data: null,
    });
  }
});

const UserController = router;

export default UserController;
