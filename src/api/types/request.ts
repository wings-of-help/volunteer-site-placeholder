export type RequestStatus = 'Available' | 'In progress' | 'Completed';

export interface Request {
  id: string;
  city: string;
  category: string;
  title: string;
  description: string;
  status: RequestStatus;
}