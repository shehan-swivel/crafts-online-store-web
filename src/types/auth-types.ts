export type Login = {
  username: string;
  password: string;
};

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
