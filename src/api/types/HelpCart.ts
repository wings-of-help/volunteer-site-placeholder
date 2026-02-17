export type HelpCart = {
  id: number;
  title: string;
  location: number;
  location_name: string;
  description: string;
  kind: "request" | "offer";
  category: number;
  category_name: string;
  status: 'new' | 'in_progress' | 'done';
  creator: number;
  // "counterpart": 0;
  created_at: string;
  updated_at: string;
  completed_at: string;
};



