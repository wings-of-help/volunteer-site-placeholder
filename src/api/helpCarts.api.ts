import type { HelpResponse } from "./types/HelpResponce";

const BASE_URL = 'https://alert-ambition-dev.up.railway.app/api/v1';

export async function GetHelpCarts(): Promise<HelpResponse> {
  const res = await fetch(
    `${BASE_URL}/help/`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch help carts');
  }

  return res.json();
}