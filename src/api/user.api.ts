import type { User } from './types/auth';
import { BASE_URL } from './config';


export const getMyProfileRequest = async (): Promise<User> => {
  const access = localStorage.getItem('access');

  const response = await fetch(
    `${BASE_URL}/user/my-profile/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};
