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
    !isAuth ? await signInWithGoogle() : await signOut();
    router.refresh();
  };
  return (
    <>
      <button
        onClick={handlerSign}
        className={`w-fit rounded-full border-2 border-black px-7 py-2 max-sm:collapse`}
      >
        {!isAuth ? "Sign in" : "Sign out"}
      </button>
      <HamburgerButton handlerSign={handlerSign} />
    </>
  );
}
