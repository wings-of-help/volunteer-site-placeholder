import type { UserRoleType } from "./role"

export type UserData = {
  id: number,
  email: string
  profile_picture: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  role: UserRoleType,
  date_joined: string,
  last_login: string,
}

