import { ToastContainer, ToastOptions, Bounce } from "react-toastify";
import Image from "next/image";
import GetStartedButton from "@/components/button/GetStartedButton";
import Vector from "@/assets/vector.png";

export default function HomePage() {
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

    return (
        <main className="flex max-md:flex-col-reverse justify-around items-center pt-20 max-md:pt-10">
            <ToastContainer {...toastConfig} />
            <div className="flex flex-col gap-10 max-md:gap-3 pt-5">
                <p className="text-4xl">Geotera</p>
                <div className="flex flex-col gap-5">
                    <p className="text-sm w-96 max-md:w-80">
                        Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living.
                    </p>
                    <GetStartedButton />
                </div>
            </div>
            <Image src={Vector} alt="Vector" priority className="w-[25rem] h-[25rem] max-sm:w-52 max-sm:h-52 max-md:w-72 max-md:h-72" />
        </main>
    );
}
