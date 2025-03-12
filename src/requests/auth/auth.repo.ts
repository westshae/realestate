import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

type UserModel = InferSelectModel<typeof users>;

export const getUserByEmail = async (email: string): Promise<UserModel | null> => {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user[0] || null;
}

export const addUser = async (email: string, hashedPassword: string, isAdmin: boolean = false): Promise<string | null> => {
  await db.insert(users).values({ email, hashedPassword, isAdmin });
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user[0].email || null;
}