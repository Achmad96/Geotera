"use client";

import { UserRecord } from "firebase-admin/auth";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import Image from "next/image";
import geotera from "@/assets/geotera.png";
import Link from "next/link";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Navbar({ variant, currentUser }: { variant: "sign-in" | "sign-out"; currentUser?: UserRecord }) {
    const router = useRouter();
    const handleSignIn = async () => {
        await signInWithGoogle();
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <nav className="flex items-center justify-between w-full h-20 px-6 max-sm:h-16 max-sm:px-3">
            <div className="flex items-center">
                <Image src={geotera} alt="Geotera" className="w-24 h-24" priority />
                <p className="text-xl max-sm:hidden">Geotera</p>
            </div>
            <div className="flex text-sm items-center gap-7 max-sm:gap-4">
                <Link href="/">Home</Link>
                {currentUser && (
                    <button onClick={() => router.push("/orders")} className="outline-none flex gap-1">
                        <MdOutlineLocalGroceryStore size={20} />
                        Orders
                    </button>
                )}
                <button
                    onClick={() => (variant === "sign-in" ? handleSignIn() : handleSignOut())}
                    className="border-green-500 border w-fit p-3 px-5 rounded-full text-gray-800 max-sm:p-3 hover:bg-green-600 hover:text-slate-100"
                >
                    {variant === "sign-out" ? "Sign out" : "Sign in with Google"}
                </button>
            </div>
        </nav>
    );
}
