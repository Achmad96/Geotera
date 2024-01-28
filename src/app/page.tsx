import { ToastContainer } from "react-toastify";
import Image from "next/image";
import GetStartedButton from "@/components/button/GetStartedButton";
import Vector from "@/assets/vector.png";
import AnimatedText from "@/components/AnimatedText";

export default function HomePage() {
    return (
        <main className="h-auto">
            <section className="flex w-full h-[90dvh] items-center justify-center lg:justify-around max-lg:flex-col-reverse max-md:pt-10">
                <ToastContainer />
                <div className="flex flex-col gap-5 pt-5 lg:ml-24 max-md:gap-3 md:ml-10 max-sm:ml-5  ">
                    <p className="text-4xl w-[30rem] font-bold max-lg:text-3xl max-sm:text-xl max-sm:w-80 ">
                        Geotera, Clean Solution for Your <span className="text-[#2FBC9B]">Healthy</span> Environment!
                    </p>
                    <div className="flex flex-col gap-5 pb-24">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-base text-justify tracking-wider w-[25rem] max-sm:w-72">"Together Caring for Nature, Instill Love and Responsibility for Your Healthy Environment"</h2>
                            <div>
                                <p className="font-bold">Ageng Putra Pratama</p>
                                <p className="text-xs text-neutral-800">CEO of Geotera</p>
                            </div>
                        </div>
                        <GetStartedButton />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="370"
                            height="150"
                            viewBox="0 0 370 191"
                            fill="none"
                            className="absolute left-0 bottom-10 -z-10 max-lg:bottom-0 max-lg:w-56 max-lg:h-60 max-lg:collapse"
                        >
                            <path
                                d="M95.3185 9.08014C52.5185 -17.3199 -33.8481 20.0801 -71.6814 42.0801C-97.5148 57.9134 -151.581 101.48 -161.181 149.08C-173.181 208.58 -50.6815 194.08 38.3185 164.08C127.319 134.08 187.319 161.08 306.819 149.08C426.319 137.08 346.637 75.0801 306.819 42.0801C267 9.08014 148.819 42.0801 95.3185 9.08014Z"
                                fill="#2FBC9B"
                                fillOpacity="0.92"
                            />
                        </svg>
                    </div>
                </div>
                <Image src={Vector} alt="Vector" priority className="mb-16 mr-24 w-[35rem] h-[35rem] max-lg:w-80 max-lg:h-80 max-lg:mb-0 max-lg:mr-0 max-md:w-72 max-md:h-72 max-sm:w-64 max-sm:h-64" />
                <svg className="absolute right-0 -z-10 max-xl:collapse" xmlns="http://www.w3.org/2000/svg" width="850" height="970" viewBox="0 0 850 970" fill="none">
                    <path
                        d="M294.5 230.5C296.549 157.289 455.881 17.6807 547.911 -44.9951L848.19 -78L877.5 952.5C813.301 940.665 652.728 884.096 575.69 912.5C479.392 948.005 351.426 1005.51 278.69 939.5C205.954 873.49 122.995 892.768 31.8197 770.75C-59.356 648.732 63.844 468.237 178.5 398.824C267.82 344.75 291.939 322.013 294.5 230.5Z"
                        fill="#2FBC9B"
                        fillOpacity="0.92"
                    />
                </svg>
            </section>
            <section className="flex justify-center items-center w-full h-[90dvh] ">
                <AnimatedText
                    className="text-2xl tracking-wider md:text-center max-sm:text-justify w-1/2 max-sm:w-[80%]"
                    text={"Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living."}
                    once={true}
                    underlineWords={[11, 12]}
                />
            </section>
        </main>
    );
}
