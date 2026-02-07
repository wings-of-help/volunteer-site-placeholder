// Data Transfer Object для POST

export type CreateHelpRequestDto = {
  title: string;
  location: number;
  description: string;
  kind: 'request';
  category: number;
};
