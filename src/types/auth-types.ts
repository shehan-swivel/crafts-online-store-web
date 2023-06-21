import { Role } from "@/constants";

export type Login = {
  username: string;
  password: string;
};

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  username: string;
  role: Role;
  email?: string;
  requirePasswordChange: boolean;
};
