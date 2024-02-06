"use client";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { UserRecord } from "firebase-admin/auth";

export default function SignInOutButton() {
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const router = useRouter();
    const handleSignIn = async () => {
        signInWithGoogle()
            .then(() => {
                router.refresh();
            })
            .catch((err: any) => console.log(err.message));
    };

    const handleSignOut = async () => {
        signOut()
            .then(() => {
                router.refresh();
            })
            .catch((err: any) => console.log(err.message));
    };
    return (
        <button onClick={() => (!isAuth ? handleSignIn() : handleSignOut())} className={`w-fit rounded-full max-sm:text-sm border-2 border-black py-2 px-7`}>
            {!isAuth ? "Sign in" : "Sign out"}
        </button>
    );
}
