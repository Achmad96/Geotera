import { ReactNode, createContext, useState } from "react";
import { OrderModalContextType } from "@/types";

export const OrderModalContext = createContext<OrderModalContextType | null>(
  null,
);
export default function OrderModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <OrderModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </OrderModalContext.Provider>
  );
}
