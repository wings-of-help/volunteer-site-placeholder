import { BASE_URL } from "./config";
import type { UserResponce } from "./types/userResponce";

export async function GetUsers(): Promise<UserResponce> {
  const res = await fetch(`${BASE_URL}/user/`);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}