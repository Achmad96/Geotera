"use client";
import { ReactNode } from "react";

import OrderModalProvider from "@/providers/OrderModalProvider";
import AuthProvider, { AuthProviderInterface } from "@/providers/AuthProvider";

export default ({ children, authProps }: { children: ReactNode; authProps: AuthProviderInterface }): ReactNode => {
    return (
        <AuthProvider authProps={authProps}>
            <OrderModalProvider>{children}</OrderModalProvider>
        </AuthProvider>
    );
};
