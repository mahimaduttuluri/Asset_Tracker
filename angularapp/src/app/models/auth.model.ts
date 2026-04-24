export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  fullName?: string;
  userId: number;
}

export interface User {
  userId: string;
  username: string;
  email: string;
}