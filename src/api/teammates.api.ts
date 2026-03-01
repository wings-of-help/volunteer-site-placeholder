import { BASE_URL } from "./config";
import type { Teammate } from "./types/teammates";

export async function GetTeammates(): Promise<Teammate[]> {
  const res = await fetch(`${BASE_URL}/teammates/`);

  if (!res.ok) {
    throw new Error('Failed to fetch teammates');
  }

  return res.json();
}