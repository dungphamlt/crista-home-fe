/** Khớp phản hồi từ Nest `AuthController` (login / OAuth callback) */
export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  role: string;
};

export type AuthLoginResponse = {
  access_token: string;
  user: AuthUser;
};
