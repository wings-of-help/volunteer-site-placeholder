export type Teammate = {
  id: number,
  first_name: string,
  last_name: string,
  role: string,
  email: string,
  personal_website: string,
  story: string,
  date_of_birth: string,
  photo: string,
  social_links: [
    {
      id: number,
      name: string,
      link: string
    }
  ]
}
