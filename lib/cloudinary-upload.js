// This file is part of the "lib" directory, responsible for uploading files to Cloudinary using a stream.

import cloudinary from "./cloudinary";
import { Readable } from "stream";

export const uploadFileToCloudinary = async (fileBuffer, folder = "resources") => {
  return new Promise((resolve, reject) => {
    // Create a readable stream for the buffer
    const readable = new Readable();
    readable._read = () => {};  // _read is needed for stream to work
    readable.push(fileBuffer);
    readable.push(null);  // Push null to indicate end of stream

    // Upload the file to Cloudinary using the stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // Automatically detect the file type (image, video, etc.)
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

    // Pipe the readable stream into the Cloudinary upload stream
    readable.pipe(uploadStream);
  });
};