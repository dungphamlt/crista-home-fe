import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_COOKIE,
} from "@/lib/auth-cookie-names";
import type { AuthUser } from "@/types/auth";

export async function GET() {
  const store = await cookies();
  const token = store.get(AUTH_TOKEN_COOKIE)?.value ?? null;
  const userRaw = store.get(AUTH_USER_COOKIE)?.value;

  let user: AuthUser | null = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw) as AuthUser;
    } catch {
      user = null;
    }
  }

  return NextResponse.json({ token, user });
}
