import { ReactNode, createContext, useState } from "react";
export const OrderModalContext = createContext<any>(null);
export default function OrderModalProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
    return <OrderModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>{children}</OrderModalContext.Provider>;
}
