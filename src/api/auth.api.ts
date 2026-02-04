import type { LoginResponse } from './types/auth';
import type { RegisterRequest } from './types/auth';
import { BASE_URL } from './config';

export const registerRequest = async (data: RegisterRequest) => {
  const response = await fetch(`${BASE_URL}/user/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
};

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/user/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
};

export const checkEmailAvailability = async (email: string) => {
  const response = await fetch(
    `${BASE_URL}/user/check-email-availability/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
};

export const checkPhoneAvailability = async (phone: string) => {
  const response = await fetch(
    `${BASE_URL}/user/check-phone-number-availability/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number: phone }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
};
