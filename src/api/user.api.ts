import type { User } from './types/auth';
import { BASE_URL } from './config';
import { authFetch } from './authFetch';

export const getMyProfileRequest = async (): Promise<User> => {
  const response = await authFetch(`${BASE_URL}/user/my-profile/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
};

export const updateMyProfileRequest = async (
  userId: number,
  data: Pick<User, 'first_name' | 'last_name'>,
): Promise<User> => {
  const response = await authFetch(`${BASE_URL}/user/${userId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};
