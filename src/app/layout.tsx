import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";

import { getCurrentUser, isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import { UserRecord } from "firebase-admin/auth";

import NextTopLoader from "nextjs-toploader";
import Providers from "@/providers/Providers";
import Navbar from "@/components/sections/Navbar";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Geotera",
    description: "a company engaged in the environmental sector",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const isAuth: boolean | null = await isUserAuthenticated();
    const user: UserRecord | null = await getCurrentUser();

    return (
        <html lang="en">
            <body>
                <NextTopLoader color="#2FBC9B" />
                <Providers isAuth={isAuth} user={JSON.parse(JSON.stringify(user))}>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
