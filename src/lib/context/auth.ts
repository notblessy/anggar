"use server";

import { cookies } from "next/headers";

// This is a mock function. In a real application, you would validate credentials against a database.
export async function login(email: string, password: string): Promise<boolean> {
  // For demo purposes, we'll consider any non-empty email and password as valid
  if (email && password) {
    cookies().set("user", email, { httpOnly: true });
    return true;
  }
  return false;
}

export async function logout() {
  cookies().delete("user");
}

export async function getUser(): Promise<string | null> {
  const user = cookies().get("user");
  return user ? user.value : null;
}
