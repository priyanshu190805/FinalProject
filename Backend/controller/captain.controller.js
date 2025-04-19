import { validationResult } from "express-validator";
import { CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { BlackListTokenModel } from "../models/blacklistToken.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";
import fs from "fs";

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { firstname, lastname, email, password, color, plate, capacity, vehicleType, company, model } = req.body;

  const isCaptainAlreadyExist = await CaptainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  let profilePhotoUrl = undefined 
  const localFilePath = req.file?.path

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
    profilePhoto : profilePhotoUrl,
    company : company,
    model : model
  });

  const token = captain.generateAuthToken();

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

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

const getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

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

    const {fullname} = req.body

  const captain = await CaptainModel.findById(req.captain._id)

  captain.fullname.firstname = fullname.firstname

  if (fullname?.lastname !== undefined) {
    captain.fullname.lastname = fullname.lastname;
  } else {
    captain.fullname.lastname = "";
  }

  await captain.save({ validateBeforeSave: false });
  return res.status(200).json({ message: "Username updated successfully" });
}

export {
  registerCaptain,
  loginCaptain,
  logoutCaptain,
  getCaptainProfile,
  changeCaptainDp,
  updateCaptainName
};
