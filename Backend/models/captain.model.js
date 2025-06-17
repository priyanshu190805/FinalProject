import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters long"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [5, "Email name must be atleast 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be atleast 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be atleast 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "auto", "bike"],
    },
    company: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  profilePhoto: {
    type: String,
    default: "",
    required: true,
  },
  refreshToken: {
    type: String,
    select: false,
  },
  socketId: {
    type: String,
  },
});

captainSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return accessToken;
};

captainSchema.methods.generateTokens = function () {
  const accessToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const CaptainModel = mongoose.model("CaptainModel", captainSchema);
