
"use server";
import { v2 as cloudinary } from "cloudinary";
import { serverMutate } from "../core/server";
import { revalidatePath } from "next/cache";
import {  toast } from "@heroui/react";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;


export const createJob = async (newJobData) => {
  return await serverMutate('/api/jobs', newJobData)
}


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
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


export async function updateCompany(companyId, formData) {
  const res = await fetch(`${baseUrl}/api/myCompany/${companyId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!res.ok) throw new Error('Update failed')

  revalidatePath('/recruiterdashboard/recruitercompany') // তোমার actual path দাও
  return await res.json()
}

export async function createApplications(applicationData) {
return serverMutate('/api/applications', applicationData)  
}

export async function createSubs(subsData) {
  return serverMutate('/api/subscription', subsData)
  
}

export async function updateCompanyStatus(id, data) {
  const result = await serverMutate(`/api/companies/${id}`, data, 'PATCH')
  console.log('result', result)
    if(result.success){
    revalidatePath('/adminDashboard/companies')
  }
  if(result.message == 'forbidden'){
    redirect('/forbidden')
  }
  return result
}

export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
        userId: userId,
        role: role, // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
revalidatePath('/adminDashboard/users')
return data
} 