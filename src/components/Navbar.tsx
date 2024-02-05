import Image from "next/image";
import geotera from "@/assets/geotera.png";
import SignInOutButton from "@/components/buttons/SignInOutButton";
import NotificationButton from "@/components/buttons/NotificationButton";
import HamburgerButton from "@/components/buttons/HamburgerButton";

export default function Navbar() {
    return (
        <nav className="flex w-full h-[10dvh] items-center justify-between px-3">
            <div className="flex items-center w-fit h-fit">
                <Image src={geotera} alt="Geotera" className="w-32 h-32 max-sm:w-10 max-sm:h-10" priority />
                <p className="text-xl max-sm:hidden text-[#3B8565] -ml-7">Geotera</p>
            </div>
            <div className="flex items-center gap-7 max-sm:gap-3 max-sm:collapse">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <NotificationButton />
                <SignInOutButton />
            </div>
            <HamburgerButton />
        </nav>
    );
}
