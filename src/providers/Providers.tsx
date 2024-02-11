"use client";

import { UserRecord } from "firebase-admin/auth";
import { ReactNode } from "react";

import AuthProvider from "@/providers/AuthProvider";
import OrderModalProvider from "@/providers/OrderModalProvider";

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
