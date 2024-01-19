import { UserRecord } from "firebase-admin/auth";
import { ReactNode, createContext } from "react";
export const AuthContext = createContext<any>(null);
export default function AuthProvider({ children, currentUser, isAuth }: { children: ReactNode; currentUser: UserRecord; isAuth: boolean }) {
    return <AuthContext.Provider value={{ currentUser, isAuth } as { currentUser: UserRecord; isAuth: boolean }}>{children}</AuthContext.Provider>;
}
