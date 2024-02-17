import { ToastContainer } from "react-toastify";
import OrderModal from "@/components/modals/OrderModal";
import { defaultToastConfig } from "@/utils/toastConfig";
import HeroSection from "@/components/sections/Hero";
import OrdersSection from "@/components/sections/Orders";

export default async function Home() {
    return (
        <main className="flex flex-col items-center h-auto w-full max-w-full">
            <ToastContainer {...defaultToastConfig} />
            <OrderModal />
            <HeroSection />
            <OrdersSection />
        </main>
    );
}
