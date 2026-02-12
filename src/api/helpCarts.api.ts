import type { HelpResponse } from './types/HelpResponce';
import { BASE_URL } from './config';
import { authFetch } from './authFetch';
import type { CreateHelpRequestDto } from './types/CreateHelpRequest';

export async function GetHelpCarts(): Promise<HelpResponse> {
  const res = await fetch(`${BASE_URL}/help/`);

  if (!res.ok) {
    throw new Error('Failed to fetch help carts');
  }

  return res.json();
}

export const createHelpRequest = async (
  data: CreateHelpRequestDto
) => {
  const response = await authFetch(`${BASE_URL}/help/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create request');
  }

  return response.json();
};
