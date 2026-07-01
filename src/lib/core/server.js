import { getUserToken } from "../session/getSession";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {}
  return header;
}



// server mutation central function
export const serverMutate = async (path, data, method = 'POST') => {
  console.log('data before post', path, data, method)
const res = await fetch(`${baseUrl}${path}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ... await authHeader()
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  // console.log(result , 'data after post')

  return { ...result, ok: res.ok, status: res.status };
}

// server fetching central function
export const serverFetch = async (path) => {
  
  const res = await fetch(`${baseUrl}${path}`);

  // যদি রেসপন্স ২00-299 এর মধ্যে না হয়
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server API Error:", errorData);
      return []; // সেফটি হিসেবে খালি অ্যারে রিটার্ন করুন
    }



  const data = await res.json();
  return data;
}

export const protectedFetch = async (path) => {
  
  const res = await fetch(`${baseUrl}${path}`,{
    headers: await authHeader()
  }

  );
  const data = await res.json();
  console.log(data, 'res from protected fetch')
  return handleStatusCode(data);
}


const handleStatusCode = res => {
  console.log(res, "res")
  
  if (res.status == 401) {
    redirect('/unauthorized')
  }
  if (res.status == 403) {
    redirect('/forbidden')
  }
  if (res.status == 404) {
    console.log(" data did not found");
    // আপনি চাইলে কোনো নোটিফিকেশন দেখাতে পারেন বা অন্য পেজে রিডাইরেক্ট করতে পারেন
  }
  if (res.status == 500) {
    console.log("সার্ভারে কোনো সমস্যা হয়েছে");
  }

  return res
}