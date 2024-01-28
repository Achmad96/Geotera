"use client";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { UserRecord } from "firebase-admin/auth";

export default function SignInOutButton() {
    const { currentUser, isAuth }: { currentUser: UserRecord; isAuth: boolean } = useContext(AuthContext);
    const router = useRouter();
    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {currentUser && (
                <button onClick={() => router.push("/orders")} className="outline-none flex gap-1">
                    <MdOutlineLocalGroceryStore size={20} />
                    Orders
                </button>
            )}
            <button onClick={() => (!isAuth ? handleSignIn() : handleSignOut())} className="w-fit rounded-full max-sm:text-sm">
                {isAuth ? <CgProfile className="w-7 h-7" /> : "Sign in"}
            </button>
        </>
    );
}
