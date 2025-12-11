export type Role = "USER" | "DRIVER" | "ADMIN" | "MASTER";

export interface User {
  id: string;
  name?: string;
  email?: string;
  role?: Role;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
