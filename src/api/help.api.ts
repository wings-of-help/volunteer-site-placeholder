import { BASE_URL } from './config';
import { authFetch } from './authFetch';
import type { HelpRequest } from './types/help';
import type { Paginated } from './types/common';

export const getMyRequests = async (
  userId: number
): Promise<HelpRequest[]> => {
  const res = await authFetch(
    `${BASE_URL}/help/?kind=request&creator=${userId}&ordering=-created_at`
  );

  if (!res.ok) {
    throw new Error('Failed to load my requests');
  }

  const data: Paginated<HelpRequest> = await res.json();
  return data.results;
};

export const getMyOffers = async (userId: number) => {
  const res = await authFetch(
    `${BASE_URL}/help/?kind=offer&creator=${userId}&ordering=-created_at`
  );

  if (!res.ok) {
    throw new Error('Failed to load my offers');
  }

  const data: Paginated<HelpRequest> = await res.json();
  return data.results;
};

export const getMyResponses = async (userId: number): Promise<HelpRequest[]> => {
  const res = await authFetch(
    `${BASE_URL}/help/?counterpart=${userId}&ordering=-created_at`
  );

  if (!res.ok) {
    throw new Error('Failed to load my responses');
  }

  const data: Paginated<HelpRequest> = await res.json();
  return data.results;
};

