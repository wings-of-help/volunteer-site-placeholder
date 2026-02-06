import type { HelpCart } from "./HelpCart";

export type HelpResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HelpCart[];
};