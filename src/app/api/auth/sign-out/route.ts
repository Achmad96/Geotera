import { APIResponse } from "@/types";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

export async function POST() {
    const sessionCookie = cookies().get("__session")?.value;
    if (!sessionCookie) return NextResponse.json<APIResponse<string>>({ success: false, error: "Session not found." }, { status: 400 });
    await revokeAllSessions(sessionCookie);
    cookies().delete("__session");
    return NextResponse.json<APIResponse>({ success: true, data: {} });
}
