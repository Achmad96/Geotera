import { auth } from "@/lib/firebase";
import { UserRecord } from "firebase-admin/auth";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import nookies, { destroyCookie } from "nookies";
export interface AuthProviderInterface {
    user: UserRecord | null;
    isAuth: boolean;
}

const AuthContext = createContext<AuthProviderInterface | null>(null);
const AuthProvider = ({ children, authProps }: { children: ReactNode; authProps: AuthProviderInterface }) => {
    const router = useRouter();
    useEffect(() => {
        getRedirectResult(auth).then(async userCredentials => {
            if (!userCredentials) return;
            await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { Authorization: "Bearer " + (await userCredentials.user.getIdToken()) },
            });
            router.refresh();
        });

        const unsubscribe = onAuthStateChanged(auth, () => {
            if (nookies.get(null, "loading")) {
                destroyCookie(null, "loading");
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return <AuthContext.Provider value={authProps as AuthProviderInterface}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext) as AuthProviderInterface;
};

export default AuthProvider;
