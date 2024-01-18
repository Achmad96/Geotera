import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";

export const metadata: Metadata = {
    title: "Geotera",
    description: "Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const isAuth = await isUserAuthenticated();
    return (
        <html lang="en">
            <body>
                <Navbar variant={isAuth ? "sign-out" : "sign-in"} />
                {children}
            </body>
        </html>
    );
}
