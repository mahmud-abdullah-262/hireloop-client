
"use server";
import { v2 as cloudinary } from "cloudinary";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';

export async function createJob(newJobData) {
  console.log(newJobData , 'function called')
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJobData),
  });
  const data = await res.json();
  console.log(data , 'data after post')
  return data;

}






cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(formData) {
  const file = formData.get("file");
  if (!file) throw new Error("No file provided");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "hireJob-company-logos",
          resource_type: "image",
        },
        (error, result) => {
  if (error || !result) reject(error);
  else {
    const transformedUrl = cloudinary.url(result.public_id, {
      transformation: [
        {
          crop: "auto",
          gravity: "auto",
          height: 480,
          width: 840,
          radius: 20,
        },
      ],
      fetch_format: "auto",
      quality: "auto",
    });
    resolve(transformedUrl);
  }
}
      )
      .end(buffer);
  });
}