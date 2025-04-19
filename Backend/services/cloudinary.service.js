import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) {
        return null;
      }
  
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
  
      console.log("Uploaded successfully", response.url);
      return response;
    } catch (error) {
      console.error("Cloudinary Upload Failed:", error);
  
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
  
      throw error; // rethrow so the controller can handle it
    }
  };
  