"use client";
import { NextUIProvider } from "@nextui-org/react";
import { UserRecord } from "firebase-admin/auth";
import AuthProvider from "@/providers/AuthProvider";
import OrderModalProvider from "@/providers/OrderModalProvider";

export default function Providers({ children, currentUser, isAuth }: { children: React.ReactNode; currentUser: UserRecord; isAuth: boolean }): React.ReactNode {
    return (
        <NextUIProvider>
            <AuthProvider currentUser={currentUser} isAuth={isAuth}>
                <OrderModalProvider>{children}</OrderModalProvider>
            </AuthProvider>
        </NextUIProvider>
    );
}
