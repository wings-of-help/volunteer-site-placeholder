import type { HelpResponse } from './types/HelpResponce';
import { BASE_URL } from './config';
import { authFetch } from './authFetch';
import type { CreateHelpRequestDto } from './types/CreateHelpRequest';
import type { HelpCartFull } from './types/HelpCart';

export async function GetHelpCarts(params?: {
  kind?: "offer" | "request";
  category?: number[];
  location?: number;
  status?: string[];
  ordering?: string;
}): Promise<HelpResponse> {
  const query = new URLSearchParams();

  if (params?.kind) {
    query.append("kind", params.kind);
  }

  if (params?.location) {
    query.append("location", String(params.location));
  }

  if (params?.ordering) {
    query.append("ordering", params.ordering);
  }

  if (params?.category?.length) {
    query.append("category", params.category.join(","));
  }

  if (params?.status?.length) {
    query.append("status", params.status.join(","));
  }

  const url = `${BASE_URL}/help/${query.toString() ? `?${query}` : ""}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch help carts");
  }

  return res.json();
}

export async function GetHelpCartById(id: number | undefined): Promise<HelpCartFull> {
  const res = await fetch(`${BASE_URL}/help/${id}`);

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
