
"use server";
import { v2 as cloudinary } from "cloudinary";
import { serverMutate } from "../core/serverMutate";

export const createJob = async (newJobData) => {
  return await serverMutate('/api/jobs', newJobData)
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


export async function createCompany(newCompanyData) {
  return  serverMutate('/api/companies', newCompanyData)
}