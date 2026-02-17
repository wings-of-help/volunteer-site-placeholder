import type { UserData } from "./user"

export type UserResponce = {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserData[];
}