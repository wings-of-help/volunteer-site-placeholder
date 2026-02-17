import { BASE_URL } from "./config";
import type { UserData } from "./types/user";

export async function GetUserById(): Promise<UserData> {
  const res = await fetch(`${BASE_URL}/user/`);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}