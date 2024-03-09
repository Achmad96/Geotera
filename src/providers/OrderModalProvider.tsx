import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type OrderModalContextType = {
  isModalOpen?: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

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
export const useOrderModal = () => {
  return useContext(OrderModalContext) as OrderModalContextType;
};
