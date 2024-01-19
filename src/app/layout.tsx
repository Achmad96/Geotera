import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser, isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import Providers from "@/context/Providers";
import Navbar from "@/components/Navbar";
import { UserRecord } from "firebase-admin/auth";

export const metadata: Metadata = {
    title: "Geotera",
    description: "Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const isAuth: boolean | null = await isUserAuthenticated();
    const user: UserRecord | null = await getCurrentUser();

    return (
        <html lang="en">
            <body>
                <Providers isAuth={isAuth} currentUser={JSON.parse(JSON.stringify(user))}>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
