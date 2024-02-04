"use client";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { UserRecord } from "firebase-admin/auth";

export const handleSignIn = async () => {
    try {
        await signInWithGoogle();
    } catch (err) {
        console.error(err);
    }
};

export const handleSignOut = async () => {
    try {
        await signOut();
    } catch (err) {
        console.error(err);
    }
};

export default function SignInOutButton() {
    const { isAuth }: { currentUser: UserRecord; isAuth: boolean } = useContext(AuthContext);
    const router = useRouter();
    return (
        <button
            onClick={() => {
                !isAuth ? handleSignIn() : handleSignOut();
                router.push("/");
                router.refresh();
            }}
            className={`w-fit rounded-full max-sm:text-sm border-2 border-black py-2 px-7`}
        >
            {!isAuth ? "Sign in" : "Sign out"}
        </button>
    );
}
