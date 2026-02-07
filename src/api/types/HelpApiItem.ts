export type HelpApiItem = {
  id: number;
  title: string;
  location: number;
  location_name: string;
  description: string;
  kind: 'request' | 'offer';
  category: number;
  category_name: string;
  status: 'new' | 'in_progress' | 'done';
  creator: number;
  counterpart: number | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};
