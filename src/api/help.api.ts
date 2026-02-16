import { BASE_URL } from './config';
import { authFetch } from './authFetch';
import type { HelpRequest } from './types/help';
import type { Paginated } from './types/common';

export const getMyRequests = async (userId: number): Promise<HelpRequest[]> => {
  const res = await authFetch(
    `${BASE_URL}/help/?kind=request&creator=${userId}&ordering=-created_at`,
  );

  if (!res.ok) {
    throw new Error('Failed to load my requests');
  }

  const data: Paginated<HelpRequest> = await res.json();
  return data.results;
};

export const getMyOffers = async (userId: number) => {
  const res = await authFetch(
    `${BASE_URL}/help/?kind=offer&creator=${userId}&ordering=-created_at`,
  );

  if (!res.ok) {
    throw new Error('Failed to load my offers');
  }

  const data: Paginated<HelpRequest> = await res.json();
  return data.results;
};

export const getMyResponses = async (
  userId: number,
): Promise<HelpRequest[]> => {
  const res = await authFetch(
    `${BASE_URL}/help/?counterpart=${userId}&ordering=-created_at`,
  );

  if (!res.ok) {
    throw new Error('Failed to load my responses');
  }

  const data: Paginated<HelpRequest> = await res.json();
  return data.results;
};

// Make it done in_progress--->done!
// поки не працює!
export const completeHelpRequest = (id: number) => {
  return authFetch(`${BASE_URL}/help/${id}/complete/`, {
    method: 'POST',
  });
};

export const deleteHelpRequest = (id: number) => {
  return authFetch(`${BASE_URL}/help/${id}/`, {
    method: 'DELETE',
  });
};

export const updateHelpRequest = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    category?: number;
    location?: number;
  }
) => {
  const res = await authFetch(`${BASE_URL}/help/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update help request');
  }

  return res.json();
};

// зміна картки після її редагування 
export const getHelpById = async (id: number): Promise<HelpRequest> => {
  const res = await authFetch(`${BASE_URL}/help/${id}/`);

  if (!res.ok) {
    throw new Error('Failed to load help request');
  }

  return res.json();
};
