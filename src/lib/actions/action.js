

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