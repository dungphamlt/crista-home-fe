import { NextResponse } from "next/server";
import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_COOKIE,
} from "@/lib/auth-cookie-names";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(AUTH_TOKEN_COOKIE);
  res.cookies.delete(AUTH_USER_COOKIE);
  return res;
}
