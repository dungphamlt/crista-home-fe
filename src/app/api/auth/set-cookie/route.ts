import { NextResponse } from "next/server";
import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_COOKIE,
} from "@/lib/auth-cookie-names";

const DEFAULT_MAX_AGE_SEC = 60 * 60 * 24 * 7;

type Body = {
  token?: string;
  user?: unknown;
  expiresIn?: number;
};

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { token, user, expiresIn } = body;
  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const maxAge =
    typeof expiresIn === "number" && expiresIn > 0
      ? expiresIn
      : DEFAULT_MAX_AGE_SEC;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_TOKEN_COOKIE, token, cookieOptions(maxAge));

  if (user != null) {
    res.cookies.set(
      AUTH_USER_COOKIE,
      JSON.stringify(user),
      cookieOptions(maxAge),
    );
  } else {
    res.cookies.delete(AUTH_USER_COOKIE);
  }

  return res;
}
