// union types
export type Role =
  | "admin"
  | "electrician"
  | "project manager"
  | "technical manager"
  | "supervisor";

export type Status = "active" | "inactive" | "blocked" | "invited";

export type TabName = "users" | "userRoles";

export type InvitationType = "resent" | "multy";

// interfaces
export interface User {
  id: string;
  image: string | undefined;
  name: string;
  family: string;
  role: Role;
  isOwner: boolean;
  email: string;
  createdOn: string;
  countryCode: string;
  phone: string;
  status: Status;
}
