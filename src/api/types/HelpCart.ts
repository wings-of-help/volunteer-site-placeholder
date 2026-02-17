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

export type CreatorInfo = {
  id: number;
  email: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: "volunteer" | "distressed"; // за потреби додати інші ролі
  date_joined: string; // ISO string
  last_login: string; // ISO string
};

export type HelpCartFull = {
  id: number;
  title: string;
  location_name: string;
  location: number;
  description: string;
  kind: "request" | "offer";
  category: number;
  category_name: string;
  status: "new" | "in_progress" | "done"; // додай інші статуси якщо є
  creator: number;
  creator_info: CreatorInfo;
  counterpart: number;
  counterpart_info: CreatorInfo;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  completed_at: string; // ISO string
};

