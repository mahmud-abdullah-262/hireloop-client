


import { getSessionData } from '@/lib/session/getSession';
import React from 'react';

const MyProfile = async () => {

  const user = await getSessionData()
  console.log(user, 'user');
  return (
    <div>
      {user &&
      <>
       <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
      </>
      }
     
    </div>
  );
};

export default MyProfile;