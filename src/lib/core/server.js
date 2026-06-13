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
  return result;
}

// server fetching central function
export const serverFetch = async (path) => {
  
  const res = await fetch(`${baseUrl}${path}`);
  const data = await res.json();
  return data;
}

export const protectedFetch = async (path) => {
  
  const res = await fetch(`${baseUrl}${path}`,{
    headers: await authHeader()
  }

  );
  const data = await res.json();
  return handleStatusCode(data);
}


const handleStatusCode = res => {
  if(res.status == 401){
    redirect('/unauthorized')
  }
  if(res.status == 403){
    redirect('/forbidden')
  }

  return res
}