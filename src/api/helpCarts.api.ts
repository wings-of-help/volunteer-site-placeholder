import type { HelpCart } from "./types/HelpCart";
import type { HelpResponse } from "./types/HelpResponce";

const BASE_URL = 'https://alert-ambition-dev.up.railway.app/api/v1';

export async function GetHelpCarts(): Promise<HelpResponse> {
  const res = await fetch(
    `${BASE_URL}/help/`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch help carts');
  }

  return res.json();
}

export const mockHelpCarts: HelpCart[] = [
  {
    id: 1,
    title: 'Evacuation assistance for elderly people',
    location_name: 'Kharkiv',
    description:
      'We urgently need volunteers and vehicles to help evacuate elderly residents from high-risk areas in Kharkiv. Coordination, transportation, and temporary shelter support are all required. Any assistance is greatly appreciated.',
    category_name: 'Evacuation / Relocation',
    status: 'new',
    date: 'Jan 18, 2026',
  },
  {
    id: 2,
    title: 'Urgent medical supplies needed',
    location_name: 'Dnipro',
    description:
      'Local medical centers are running low on essential supplies including bandages, first aid kits, and basic medications. Volunteers who can help procure and deliver these items are urgently needed.',
    category_name: 'Medical Support',
    status: 'in progress',
    date: 'Jan 19, 2026',
  },
  {
    id: 3,
    title: 'Temporary shelter for displaced families',
    location_name: 'Lviv',
    description:
      'Several families displaced by recent events are seeking temporary housing. Assistance with finding safe accommodations, bedding, and basic necessities is urgently required to ensure their wellbeing.',
    category_name: 'Shelter / Housing',
    status: 'new',
    date: 'Jan 20, 2026',
  },
  {
    id: 4,
    title: 'Food packages for local community',
    location_name: 'Mykolaiv',
    description:
      'Community members are in need of food and basic supplies. Volunteers can assist by preparing and delivering food packages, coordinating donations, and supporting distribution efforts.',
    category_name: 'Food & Basic Supplies',
    status: 'done',
    date: 'Jan 21, 2026',
  },
  {
    id: 5,
    title: 'Transport for humanitarian aid',
    location_name: 'Odesa',
    description:
      'Looking for vehicles and drivers to transport humanitarian aid across Odesa region. Coordination with local volunteers and ensuring safe delivery of supplies is critical.',
    category_name: 'Logistics / Transportation',
    status: 'in progress',
    date: 'Jan 22, 2026',
  },
  {
    id: 6,
    title: 'Psychological support for children',
    location_name: 'Kyiv',
    description:
      'Children affected by conflict need professional psychological support. Volunteers with experience in counseling or child care are requested to provide guidance, activities, and emotional support.',
    category_name: 'Psychological Support',
    status: 'new',
    date: 'Jan 23, 2026',
  },
  {
    id: 7,
    title: 'Support for families with children',
    location_name: 'Chernihiv',
    description:
      'Families with young children require assistance with daily needs, childcare, and essential resources. Volunteers can help with distribution of supplies, tutoring, and general support.',
    category_name: 'Child & Family Support',
    status: 'in progress',
    date: 'Jan 24, 2026',
  },
  {
    id: 8,
    title: 'Legal help with documents',
    location_name: 'Vinnytsia',
    description:
      'Citizens who lost important documents require legal assistance to restore IDs, property papers, and other essential documents. Volunteers with legal expertise are highly appreciated.',
    category_name: 'Legal / Administrative Assistance',
    status: 'done',
    date: 'Jan 25, 2026',
  },
];