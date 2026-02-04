import type { LoginResponse } from './types/auth';
import type { RegisterRequest } from './types/auth';

const BASE_URL = 'https://alert-ambition-dev.up.railway.app/api/v1';

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
