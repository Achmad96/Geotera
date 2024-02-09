import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "@/types";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

export async function POST(request: NextRequest) {
    const reqBody = (await request.json()) as { idToken: string };
    const idToken = reqBody.idToken;
    if (!idToken) return NextResponse.json<APIResponse<string>>({ success: false, error: "Invalid idToken" });
    const expiresIn = 60 * 60 * 24 * 7 * 1000;
    const sessionCookie = await createSessionCookie(idToken, { expiresIn });
    cookies().set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
    return NextResponse.json<APIResponse<string>>({ success: true, messages: "Signed in successfully." });
}
