"use client";

import vector from "@/assets/vector.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, ToastOptions, toast, Bounce } from "react-toastify";
import Loading from "@/app/loading";

export default function HomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const toastConfig: ToastOptions = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "1",
        transition: Bounce,
    };

    const handleGetStarted = () => {};

    return (
        <main className="flex max-md:flex-col-reverse justify-around items-center pt-20 max-md:pt-10">
            <ToastContainer {...toastConfig} />
            <div className="flex flex-col gap-10 max-md:gap-3 pt-5">
                <p className="text-4xl">Geotera</p>
                <div className="flex flex-col gap-5">
                    <p className="text-sm w-96 max-md:w-80">
                        Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living.
                    </p>
                    <button onClick={handleGetStarted} className="bg-green-600 text-slate-100 w-fit p-4 rounded-full border-green-500 border hover:bg-transparent hover:text-gray-800">
                        Get started
                    </button>
                </div>
            </div>
            <Image src={vector} alt="vector" priority className="w-[25rem] h-[25rem] max-sm:w-52 max-sm:h-52 max-md:w-72 max-md:h-72" />
        </main>
    );
}
