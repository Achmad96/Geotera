"use client";
import { defaultToastConfig } from "@/utils/toastConfig";
import { useContext } from "react";
import { toast } from "react-toastify";
import { OrderModalContext, OrderModalContextType } from "@/providers/OrderModalProvider";
import { useAuth } from "@/providers/AuthProvider";

export default function OrderButton() {
    const { setIsModalOpen } = useContext(OrderModalContext) as OrderModalContextType;
    const { isAuth } = useAuth();
    return (
        <button
            className="btn-geo"
            onClick={() => {
                if (isAuth) {
                    setIsModalOpen(true);
                    return;
                }
                toast.error("You must be logged in", {
                    ...defaultToastConfig,
                    position: "top-right",
                });
            }}
        >
            Order now!
        </button>
    );
}
