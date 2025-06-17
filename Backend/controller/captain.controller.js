import { validationResult } from "express-validator";
import { CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { BlackListTokenModel } from "../models/blacklistToken.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";
import fs from "fs";
import jwt from "jsonwebtoken";

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
    company,
    model,
  } = req.body;

  const isCaptainAlreadyExist = await CaptainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  let profilePhotoUrl = undefined;
  const localFilePath = req.file?.path;

  try {
    const uploadedImage = await uploadOnCloudinary(localFilePath);

    profilePhotoUrl = uploadedImage.secure_url;

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  } catch (error) {
    console.error("Image upload error:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return res.status(500).json({ error: "Failed to upload profile picture" });
  }

  const hashedPassword = await CaptainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: firstname,
    lastname: lastname,
    email,
    password: hashedPassword,
    color: color,
    plate: plate,
    capacity: capacity,
    vehicleType: vehicleType,
    profilePhoto: profilePhotoUrl,
    company: company,
    model: model,
  });

  const token = captain.generateAccessToken();

  res.status(201).json({ token, captain });
};

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await CaptainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const { accessToken, refreshToken } = await captain.generateTokens();

  captain.refreshToken = refreshToken;
  await captain.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
<<<<<<< HEAD
    sameSite: "None", 
  }

  res.cookie("captainAccessToken", accessToken, options);
  res.cookie("captainRefreshToken", refreshToken, options);

=======
    sameSite: "None",
  };

  res.cookie("captainAccessToken", accessToken, options);
  res.cookie("captainRefreshToken", refreshToken, options);
>>>>>>> c141779 (favicon updated)

  res.status(200).json({ accessToken, captain });
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.captainRefreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const captain = await CaptainModel.findById(decodedToken?._id).select(
      "+refreshToken"
    );

    if (!captain) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (incomingRefreshToken !== captain?.refreshToken) {
      return res.status(401).json({ message: "Refresh Token Expired Or Used" });
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await captain.generateTokens();

    captain.refreshToken = newRefreshToken;
    await captain.save({ validateBeforeSave: false });

<<<<<<< HEAD
  const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None"
};


   res.cookie("captainRefreshToken", newRefreshToken, options);
   res.cookie("captainAccessToken", accessToken, options);
=======
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("captainRefreshToken", newRefreshToken, options);
    res.cookie("captainAccessToken", accessToken, options);
>>>>>>> c141779 (favicon updated)

    res.status(200).json({ accessToken, captain });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

const getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res, next) => {
  const token = req.cookies.captainAccessToken;

  if (!token) {
    return res.status(400).json({ message: "No access token found" });
  }

  const captain = await CaptainModel.findById(req.captain?._id).select(
    "+refreshToken"
  );

  captain.refreshToken = null;

  const options = {
<<<<<<< HEAD
  httpOnly: true,
  secure: true,
  sameSite: "None"
};


  res.clearCookie("captainAccessToken", options);
  res.clearCookie("captainRefreshToken", options);

=======
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.clearCookie("captainAccessToken", options);
  res.clearCookie("captainRefreshToken", options);
>>>>>>> c141779 (favicon updated)

  await BlackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};

const changeCaptainDp = async (req, res) => {
  try {
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ error: "No file provided" });
    }

    const uploadedImage = await uploadOnCloudinary(localFilePath);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    const captain = await CaptainModel.findById(req.captain?._id);

    captain.profilePhoto = uploadedImage.secure_url;

    await captain.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Profile photo updated successfully",
      profilePhoto: uploadedImage.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload profile photo" });
  }
};

const updateCaptainName = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { fullname } = req.body;

  const captain = await CaptainModel.findById(req.captain._id);

  captain.fullname.firstname = fullname.firstname;

  if (fullname?.lastname !== undefined) {
    captain.fullname.lastname = fullname.lastname;
  } else {
    captain.fullname.lastname = "";
  }

  await captain.save({ validateBeforeSave: false });
  return res.status(200).json({ message: "Username updated successfully" });
};

const changeCaptainPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  const captain = await CaptainModel.findById(req.captain?._id).select(
    "+password"
  );

  if (!captain) {
    return res.status(404).json({ message: "captain not found" });
  }

  const isPasswordCorrect = await captain.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid old password" });
  }

  captain.password = await CaptainModel.hashPassword(newPassword);
  await captain.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
};

const changeVehicleDetails = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { color, plate, capacity, vehicleType, company, model } = req.body;

  const captain = await CaptainModel.findById(req.captain?._id);

  if (!captain) {
    return res.status(404).json({ message: "captain not found" });
  }

  captain.vehicle.color = color;
  captain.vehicle.plate = plate;
  captain.vehicle.vehicleType = vehicleType;
  captain.vehicle.company = company;
  captain.vehicle.model = model;
  captain.vehicle.capacity = capacity;

  await captain.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ message: "Vehcile details updated successfully" });
};

export {
  registerCaptain,
  loginCaptain,
  logoutCaptain,
  getCaptainProfile,
  changeCaptainDp,
  updateCaptainName,
  changeCaptainPassword,
  changeVehicleDetails,
  refreshAccessToken,
};
