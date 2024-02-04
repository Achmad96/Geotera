"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { defaultToastConfig } from "@/utils/ToastConfig";
import { useContext } from "react";
import { toast } from "react-toastify";
import { OrderModalContext } from "@/providers/OrderModalProvider";

export default function OrderButton() {
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const { setIsModalOpen } = useContext(OrderModalContext);
    return (
        <button
            className="btn-geo"
            onClick={() => {
                if (isAuth) {
                    setIsModalOpen(true);
                    return;
                }
                toast.error("You must be logged in", { ...defaultToastConfig, position: "top-right" });
            }}
        >
            Order now!
        </button>
    );
}
