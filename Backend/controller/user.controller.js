import { UserModal } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlackListTokenModel } from "../models/blacklistToken.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";
import fs from "fs";

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await UserModal.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json("User already exists");
  }

  const hashedPassword = await UserModal.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const user = await UserModal.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};

const changePassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  const user = await UserModal.findById(req.user?._id).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid old password" });
  }

  user.password = await UserModal.hashPassword(newPassword);
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
};

const changeUsername = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { fullname } = req.body;

  const user = await UserModal.findById(req.user?._id);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.fullname.firstname = fullname.firstname;

  if (fullname?.lastname !== undefined) {
    user.fullname.lastname = fullname.lastname;
  } else {
    user.fullname.lastname = "";
  }

  await user.save({ validateBeforeSave: false });
  return res.status(200).json({ message: "Username updated successfully" });
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ error: "No file provided" });
    }

    const uploadedImage = await uploadOnCloudinary(localFilePath);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    const user = await UserModal.findById(req.user._id);
    user.profilePhoto = uploadedImage.secure_url;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({
        message: "Profile photo updated successfully",
        profilePhoto: uploadedImage.secure_url,
      });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload profile photo" });
  }
};

const deleteProfilePhoto = async (req, res) => {
  try {
    const user = await UserModal.findById(req.user?._id);

    if (!user) {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    user.profilePhoto = "";

    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ message: "Profile photo deleted successfully" });
  } catch (error) {
    console.error("Failed to delete profile photo:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while deleting profile photo" });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  changePassword,
  changeUsername,
  uploadProfilePhoto,
  deleteProfilePhoto,
};
