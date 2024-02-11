import { APIResponse } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string };
  const idToken = reqBody.idToken;
  if (!idToken) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: "Invalid idToken",
      },
      { status: 498 },
    );
  }
  const expiresIn = 60 * 60 * 24 * 7 * 1000; // token expires within 7 days
  const sessionCookie = await createSessionCookie(idToken, { expiresIn });
  cookies().set("__session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });
  return NextResponse.json<APIResponse>({
    success: true,
    data: {},
  });
}
