import "server-only";

import { cookies } from "next/headers";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, SessionCookieOptions } from "firebase-admin/auth";

export const firebaseApp =
    getApps().find(it => it.name === "firebase-admin-app") ||
    initializeApp(
        {
            credential: cert({
                clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            }),
        },
        "firebase-admin-app"
    );

const auth = getAuth(firebaseApp);

export async function getCurrentUser() {
    const session = await getSession();
    if (!(await isUserAuthenticated(session))) {
        return null;
    }
    const decodedIdToken = await auth.verifySessionCookie(session!);
    return await auth.getUser(decodedIdToken.uid);
}

export async function isUserAuthenticated(session: string | undefined = undefined) {
    const _session = session ?? (await getSession());
    if (!_session) return false;
    try {
        const isRevoked = !(await auth.verifySessionCookie(_session, true));
        return !isRevoked;
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
}

async function getSession() {
    try {
        return cookies().get("__session")?.value;
    } catch (error) {
        return undefined;
    }
}

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
    return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
    const decodedIdToken = await auth.verifySessionCookie(session);
    return await auth.revokeRefreshTokens(decodedIdToken.sub);
}
