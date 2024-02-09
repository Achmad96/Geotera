"use client";
import { UserRecord } from "firebase-admin/auth";
import AuthProvider from "@/providers/AuthProvider";
import OrderModalProvider from "@/providers/OrderModalProvider";
import { ReactNode } from "react";

export default ({
  children,
  user,
  isAuth,
}: {
  children: ReactNode;
  user: UserRecord;
  isAuth: boolean;
}): ReactNode => (
  <AuthProvider user={user} isAuth={isAuth}>
    <OrderModalProvider>{children}</OrderModalProvider>
  </AuthProvider>
);
