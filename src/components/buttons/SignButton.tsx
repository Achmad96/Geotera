"use client";
import { useAuth } from "@/providers/AuthProvider";
import HamburgerButton from "./HamburgerButton";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function SignInOutButton() {
    const router = useRouter();
    const { isAuth } = useAuth();

    const handlerSign = async () => {
        setCookie(null, "loading", "true");
        !isAuth ? await signInWithGoogle() : await signOut();
        router.refresh();
    };
    return (
        <>
            <button onClick={handlerSign} className={`w-fit rounded-full max-sm:collapse border-2 border-black py-2 px-7`}>
                {!isAuth ? "Sign in" : "Sign out"}
            </button>
            <HamburgerButton handlerSign={handlerSign} />
        </>
    );
}
