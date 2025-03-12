export interface Login{
  providedEmail: string;
  providedPassword: string;
}

export interface Register{
  email: string;
  password: string;
  isAdmin: boolean;
}