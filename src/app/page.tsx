import { ToastContainer, ToastOptions, Bounce } from "react-toastify";
import Image from "next/image";
import GetStartedButton from "@/components/button/GetStartedButton";
import Vector from "@/assets/vector.png";
import AnimatedText from "@/components/AnimatedText";

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
        <main className="h-auto">
            <section className="flex h-[90dvh] max-md:flex-col-reverse items-center justify-around max-md:pt-10">
                <ToastContainer {...toastConfig} />
                <div className="flex flex-col gap-5 max-md:gap-3 pt-5">
                    <p className="text-4xl">Geotera</p>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-2xl tracking-wider w-fit max-sm:w-96">"Dongker UMKM Lestari Bumiku."</h2>
                        <div>
                            <p className="font-bold">Ageng Putra Pratama</p>
                            <p className="text-xs text-neutral-800">CEO of Geotera</p>
                        </div>
                        <GetStartedButton />
                    </div>
                </div>
                <Image src={Vector} alt="Vector" priority className="w-[25rem] h-[25rem] max-sm:w-52 max-sm:h-52 max-md:w-72 max-md:h-72" />
            </section>
            <section className="flex justify-center items-center w-full h-[90dvh]">
                <AnimatedText
                    className="text-2xl tracking-wider md:text-center w-1/2 max-sm:w-[80%]"
                    text={"Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living."}
                    once={true}
                    underlineWords={[11, 12]}
                />
            </section>
        </main>
    );
}
