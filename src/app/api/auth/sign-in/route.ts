import { APIResponse } from "@/types";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

export async function POST() {
    const authorization = headers().get("Authorization");
    const idToken = authorization?.startsWith("Bearer ") && authorization.split("Bearer ")[1];
    if (!idToken) {
        return NextResponse.json<APIResponse>(
            {
                success: false,
                error: "Invalid idToken",
            },
            { status: 498 }
        );
    }
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await createSessionCookie(idToken, { expiresIn });
    const options = {
        name: "__session",
        value: sessionCookie,
        httpOnly: true,
        secure: true,
    };
    cookies().set(options);
    return NextResponse.json<APIResponse>({
        success: true,
        data: {},
    });
}
