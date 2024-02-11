"use client";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { defaultToastConfig } from "@/utils/ToastConfig";
import { useContext } from "react";
import { toast } from "react-toastify";
import {
  OrderModalContext,
  OrderModalContextType,
} from "@/providers/OrderModalProvider";

export default function OrderButton() {
  const { isAuth } = useContext(AuthContext) as AuthContextType;
  const { setIsModalOpen } = useContext(
    OrderModalContext,
  ) as OrderModalContextType;
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
