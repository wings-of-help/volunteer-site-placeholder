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
  data: Partial<
    Pick<User, 'first_name' | 'last_name' | 'email' | 'phone_number'>
  >,
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

export const changePasswordRequest = async (payload: {
  old_password: string
  new_password: string
}) => {
  const response = await authFetch(`${BASE_URL}/user/change-password/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to change password');
  }

  return data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await fetch(`${BASE_URL}/user/password-reset/request/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const resetPassword = async (
  email: string,
  code: string,
  new_password: string
) => {
  const response = await fetch(`${BASE_URL}/user/password-reset/confirm/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      code,
      new_password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};