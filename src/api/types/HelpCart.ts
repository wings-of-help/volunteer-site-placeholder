export type HelpCart = {
  id: number;
  title: string;
  location_name: string;
  location: number,
  description: string;
  kind: "request" | "offer",
  category_name: string,
  status: 'new' | 'in progress' | 'done';
  date: string,
};
// "creator": 0,
// "counterpart": 0,
// "created_at": "2026-02-12T00:14:25.746Z",
// "updated_at": "2026-02-12T00:14:25.746Z",
// "completed_at": "2026-02-12T00:14:25.746Z"



