import type { Request } from '../../src/api/types/request';

export const mockRequests: Request[] = [
  {
    id: '1',
    city: 'Lviv',
    category: 'Humanitarian Aid',
    title: 'Food & Hygiene Supplies Needed for IDP Family',
    description:
      'A family of four, recently displaced due to ongoing conflict, has just relocated to Lviv and is facing urgent basic needs. The family includes two young children, aged 5 and 9, who require daily meals and essential hygiene products. The parents are doing their best to settle in, but currently do not have enough food, cleaning supplies, or personal care items to cover the next few days. Immediate assistance with food packages, hygiene kits, and other essentials is critical to ensure the family’s well-being and to help them stabilize in their new environment. They would greatly benefit from support within the next three days.',
    status: 'Available',
  },
  {
    id: '2',
    city: 'Kyiv',
    category: 'Medical Support',
    title: 'Medicine for elderly people',
    description: 'Urgent need for heart medication and insulin.',
    status: 'In progress',
  },
  {
    id: '3',
    city: 'Kyiv',
    category: 'Medical Support',
    title: 'Medicine for elderly people',
    description: 'Urgent need for heart medication and insulin.',
    status: 'Completed',
  },
];
