import { BASE_URL } from './config';
// import { authFetch } from './authFetch';

export type CatalogItem = {
  id: number;
  name: string;
};

export interface Category {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${BASE_URL}/help-category/`);

  if (!res.ok) {
    throw new Error('Failed to load categories');
  }

  return res.json();
};

export const getLocations = async (): Promise<Location[]> => {
  const res = await fetch(`${BASE_URL}/city/`);

  if (!res.ok) {
    throw new Error('Failed to load locations');
  }

  const data: Location[] = await res.json();

  return [...data].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};
