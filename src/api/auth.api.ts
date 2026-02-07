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
  const response = await fetch(`${BASE_URL}/user/check-email-availability/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

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

type RefreshResponse = {
  access: string;
  refresh?: string;
};

export const refreshTokenRequest = async (): Promise<string> => {
  const refresh = localStorage.getItem('refresh');

  if (!refresh) {
    throw new Error('No refresh token');
  }

  const response = await fetch(`${BASE_URL}/user/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error('Refresh token is invalid');
  }

  const data: RefreshResponse = await response.json();

  localStorage.setItem('access', data.access);

  if (data.refresh) {
    localStorage.setItem('refresh', data.refresh);
  }

  return data.access;
};

export const logoutRequest = async () => {
  const refresh = localStorage.getItem('refresh');
  const access = localStorage.getItem('access');

  if (!refresh || !access) {
    console.warn('No tokens for logout');
    return;
  }

  const response = await fetch(`${BASE_URL}/user/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    console.warn('Logout request failed');
  }
};



