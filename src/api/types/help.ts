export type HelpStatus = 'new' | 'in_progress' | 'done';

export interface HelpRequest {
  id: number;
  title: string;
  description: string;

  location: number;
  location_name: string;

  category: number;
  category_name: string;

  kind: 'request' | 'offer';
  status: HelpStatus;

  creator: number;
  counterpart: number | null;

  created_at: string;
  updated_at: string;
  completed_at: string | null;
}
