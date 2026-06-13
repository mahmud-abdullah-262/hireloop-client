import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getSessionData = async ()  => {
 const session =  await auth.api.getSession({
    headers: await headers() // some endpoints might require headers
})

  return session?.user || null
}

export const getUserToken = async () => {
  const session = await auth.api.getSession(
    {headers: await headers()}
  )
  return session?.session?.token
}
 


export const requireRole = async (role) => {
  const user = await getSessionData()
  if(!user){
    redirect('/signin')
  }
  if(user.role !== role){
    redirect('/unauthorized')
  }
  return user
}