import Image from "next/image";
import geotera from "@/assets/geotera.png";
import SignButton from "@/components/buttons/SignButton";
import NotificationButton from "@/components/buttons/NotificationButton";

export default async function Navbar() {
    return (
        <nav className="flex w-full h-[10svh] items-center justify-between px-2">
            <div className="flex items-center w-fit h-fit">
                <Image src={geotera} alt="Geotera" className="w-32 h-32 max-sm:w-10 max-sm:h-10" priority />
                <p className="text-xl max-sm:hidden text-[#3B8565] -ml-7">Geotera</p>
            </div>
            <div className="flex items-center gap-7 max-sm:gap-3">
                <a href={"/"} className="max-sm:collapse">
                    Home
                </a>
                <a href={"/#about"} className="max-sm:collapse">
                    About
                </a>
                <NotificationButton />
                <SignButton />
            </div>
        </nav>
    );
}
