"use client";

import { ReactNode } from "react";
import AuthProvider, { AuthContextType } from "@/providers/AuthProvider";
import OrderModalProvider from "@/providers/OrderModalProvider";

interface ProvidersInterface extends AuthContextType {
  children: ReactNode;
}

export default ({ children, user, isAuth }: ProvidersInterface): ReactNode => (
  <AuthProvider user={user} isAuth={isAuth}>
    <OrderModalProvider>{children}</OrderModalProvider>
  </AuthProvider>
);
