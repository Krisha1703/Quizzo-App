// This file is part of the "lib" directory, responsible for uploading files to Cloudinary using a stream.

import cloudinary from "./cloudinary";
import { Readable } from "stream";

export const uploadFileToCloudinary = async (fileBuffer, folder = "resources") => {
  return new Promise((resolve, reject) => {

    const readable = new Readable();
    readable._read = () => {};  
    readable.push(fileBuffer);
    readable.push(null);  

    // Upload the file to Cloudinary using the stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", 
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          console.log("Cloudinary Upload Success:", result.secure_url);
          resolve(result.secure_url);  // Return the URL of the uploaded file
        }
      }
    );

    readable.pipe(uploadStream);
  });
};