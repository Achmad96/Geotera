"use client";
import { AuthContext } from "@/context/AuthContextProvider";
import { defaultToastConfig } from "@/utils/ToastConfig";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function OrderButton() {
    const router = useRouter();
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);

    return (
        <button
            className="bg-[#2FBC9B] w-fit py-3 px-8 rounded-full border text-gray-800"
            onClick={() => {
                if (isAuth) {
                    router.push("/trash");
                    return;
                }
                toast.error("You must be logged in", { ...defaultToastConfig, position: "top-right" });
            }}
        >
            Order now!
        </button>
    );
}
