/**
 * authFetch — це обгортка над fetch для авторизованих запитів.
 *
 * Автоматично додає access token до headers: Authorization: `Bearer ${access}`
 * Якщо сервер повертає 401 (токен прострочений),
 * виконує оновлення токена через refresh token
 * та повторює початковий запит з новим access token.
 *
 *  Дозволяє не обробляти оновлення токена в кожному API-запиті окремо.
 */

import { refreshTokenRequest } from './auth.api';

export const authFetch = async (input: RequestInfo, init?: RequestInit) => {
  const access = localStorage.getItem('access');

  let response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    await refreshTokenRequest();

    const newAccess = localStorage.getItem('access');

    response = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${newAccess}`,
        'Content-Type': 'application/json',
      },
    });
  }

  if (!response.ok) {
    let data: any = null;

    try {
      data = await response.json();
    } catch {}

    const error: any = new Error('Request failed');
    error.status = response.status;
    error.data = data;

    throw error;
  }

  return response;

  return response;
};
