'use client'

import { authClient } from '@/lib/auth-client';
import React from 'react';

const MyProfile = () => {
   const { data: session, isPending } =  authClient.useSession();
  const user = session?.user;
  console.log(user, 'user');
  return (
    <div>
      {user &&
      <>
       <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>{user?.image}</p>
      </>
      }
     
    </div>
  );
};

export default MyProfile;