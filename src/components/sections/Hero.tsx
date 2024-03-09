import Image from "next/image";
import Vector from "@/assets/vector.png";
import OrderButton from "@/components/buttons/OrderButton";
export default function HeroSection() {
  return (
    <section
      id="#home"
      className="flex h-[90svh] w-full max-w-full items-center justify-center max-xl:justify-around max-lg:flex-col-reverse max-lg:pt-10"
    >
      <div className="flex flex-col gap-5 pt-5 max-sm:ml-5">
        <p className="w-[30rem] text-4xl font-bold max-lg:text-3xl max-sm:w-80 max-sm:text-2xl ">
          Clean Solution for Your{" "}
          <span className="text-[#2FBC9B]">Healthy</span> Environment!
        </p>
        <div className="flex flex-col gap-5 pb-24">
          <div className="flex flex-col gap-3">
            <h2 className="w-[25rem] text-justify text-base tracking-wider max-sm:w-72">
              "Together Caring for Nature, Instill Love and Responsibility for
              Your Healthy Environment"
            </h2>
            <div>
              <p className="font-bold">Ageng Putra Pratama</p>
              <p className="text-xs text-neutral-800">CEO of Geotera</p>
            </div>
          </div>
          <OrderButton />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="370"
            height="150"
            viewBox="0 0 370 191"
            fill="none"
            className="absolute bottom-3 left-0 -z-10 max-xl:collapse max-lg:h-60 max-lg:w-56"
          >
            <path
              d="M95.3185 9.08014C52.5185 -17.3199 -33.8481 20.0801 -71.6814 42.0801C-97.5148 57.9134 -151.581 101.48 -161.181 149.08C-173.181 208.58 -50.6815 194.08 38.3185 164.08C127.319 134.08 187.319 161.08 306.819 149.08C426.319 137.08 346.637 75.0801 306.819 42.0801C267 9.08014 148.819 42.0801 95.3185 9.08014Z"
              fill="#2FBC9B"
              fillOpacity="0.92"
            />
          </svg>
        </div>
      </div>
      <Image
        src={Vector}
        alt="Vector"
        priority
        className="-z-10 mb-16 h-[35rem] w-[35rem] max-xl:h-[30rem] max-xl:w-[30rem] max-lg:h-80 max-lg:w-80 max-sm:mb-7 max-sm:h-64 max-sm:w-64"
      />
      <svg
        className="absolute top-0 -z-20 max-xl:collapse"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 332"
      >
        <path
          d="M294.5 230.5C296.549 157.289 455.881 17.6807 547.911 -44.9951L848.19 -78L877.5 952.5C813.301 940.665 652.728 884.096 575.69 912.5C479.392 948.005 351.426 1005.51 278.69 939.5C205.954 873.49 122.995 892.768 31.8197 770.75C-59.356 648.732 63.844 468.237 178.5 398.824C267.82 344.75 291.939 322.013 294.5 230.5Z"
          fill="#2FBC9B"
          fillOpacity="0.92"
        />
      </svg>
    </section>
  );
}
