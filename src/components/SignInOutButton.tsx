"use client";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
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
            <button
                onClick={() => (!isAuth ? handleSignIn() : handleSignOut())}
                className="border-green-500 border w-fit p-3 px-5 rounded-full text-gray-800 max-sm:p-3 hover:bg-green-600 hover:text-slate-100"
            >
                {isAuth ? "Sign out" : "Sign in with Google"}
            </button>
        </>
    );
}
