"use client";
import { AuthContext } from "@/context/AuthContextProvider";
import { toastConfiguration } from "@/utils/ToastConfig";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function GetStartedButton() {
    const router = useRouter();
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    return (
        <button
            className="bg-green-600 text-slate-100 w-fit p-4 rounded-full border-green-500 border hover:bg-transparent hover:text-gray-800"
            onClick={() => {
                if (isAuth) {
                    router.push("/trash");
                    return;
                }
                toast.error("You must be logged in", { ...toastConfiguration, toastId: "must-be-logged-in" });
            }}
        >
            Get started
        </button>
    );
}
