import { UserRecord } from "firebase-admin/auth";
import { ReactNode, createContext } from "react";

export type AuthContextType = {
  user: UserRecord;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export default function AuthProvider({
  children,
  user,
  isAuth,
}: {
  children: ReactNode;
  user: UserRecord;
  isAuth: boolean;
}) {
  return (
    <AuthContext.Provider
      value={{ user, isAuth } as { user: UserRecord; isAuth: boolean }}
    >
      {children}
    </AuthContext.Provider>
  );
}
