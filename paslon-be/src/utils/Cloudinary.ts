import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

export const UploadToCloudinary = (
  file: Express.Multer.File
): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
  });

  return new Promise((resolve, reject) => {
    const opt = { folder: "Paslons" };

    cloudinary.uploader.upload(file.path, opt, function (error, result) {
      if (error) {
        return reject(error);
      }
      return resolve(result.secure_url);
    });
  });
};
