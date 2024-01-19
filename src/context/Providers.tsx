"use client";
import AuthProvider from "@/context/AuthContextProvider";
import { NextUIProvider } from "@nextui-org/react";
import { UserRecord } from "firebase-admin/auth";

export default function Providers({ children, currentUser, isAuth }: { children: React.ReactNode; currentUser: UserRecord; isAuth: boolean }): React.ReactNode {
    return (
        <NextUIProvider>
            <AuthProvider currentUser={currentUser} isAuth={isAuth}>
                {children}
            </AuthProvider>
        </NextUIProvider>
    );
}
