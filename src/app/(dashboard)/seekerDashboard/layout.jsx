import { requireRole } from '@/lib/session/getSession';
import React from 'react';

const RecruiterLayoutPage = async ({children}) => {
  
  await requireRole('seeker')
  return children
};

export default RecruiterLayoutPage;