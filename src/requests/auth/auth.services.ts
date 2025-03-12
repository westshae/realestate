import { hash } from 'bcrypt';
import { verify, sign, JwtPayload } from 'jsonwebtoken';
import { addUser, getUserByEmail } from './auth.repo';
import { Login } from './auth.models';

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
}

export async function registerAccount(email: string, password: string, isAdmin: boolean): Promise<string | null> {
  const hashedPassword = await hashPassword(password);
  return await addUser(email, hashedPassword, isAdmin);
}

export async function loginAccount({ providedEmail, providedPassword }: Login): Promise<string | null> {
  const dbUser = await getUserByEmail(providedEmail);
  const hashedProvidedPassword = await hashPassword(providedPassword);
  
  if (!hashedProvidedPassword || !dbUser || !dbUser.hashedPassword) {
    return null;
  }

  const secretKey = process.env.AUTH_SECRET_KEY;
  if (!secretKey) {
    throw new Error('AUTH_SECRET_KEY is not defined');
  }
  return sign({ email: dbUser.email }, secretKey, { expiresIn: '7d' });
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const secretKey = process.env.AUTH_SECRET_KEY;
    if (!secretKey) {
      throw new Error('AUTH_SECRET_KEY is not defined');
    }
  
    const decoded = verify(token, secretKey);
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyToken(email: string, token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      return false;
    }
    if (decoded.email !== email) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}