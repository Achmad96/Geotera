import Image from "next/image";
import geotera from "@/assets/geotera.png";
import SignButton from "@/components/buttons/SignButton";

export default async function Navbar() {
  return (
    <nav className="flex h-[10svh] w-full items-center justify-between px-2">
      <div className="flex h-fit w-fit items-center">
        <Image
          src={geotera}
          alt="Geotera"
          className="h-32 w-32 max-sm:h-10 max-sm:w-10"
          priority
        />
        <p className="-ml-7 text-xl text-[#3B8565] max-sm:hidden">Geotera</p>
      </div>
      <div className="flex items-center gap-7 max-sm:gap-3">
        <a href={"/"} className="max-sm:collapse">
          Home
        </a>
        <a href={"/#about"} className="max-sm:collapse">
          About
        </a>
        <SignButton />
      </div>
    </nav>
  );
}
