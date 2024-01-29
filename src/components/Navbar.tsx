import Image from "next/image";
import geotera from "@/assets/geotera.png";
import Link from "next/link";
import SignInOutButton from "@/components/buttons/SignInOutButton";
import NotificationButton from "./buttons/NotificationButton";
import HamburgerButton from "./buttons/HamburgerButton";

export default async function Navbar() {
    return (
        <nav className="flex w-full h-[10dvh] items-center justify-between px-6 max-sm:px-0 max-sm:pr-3">
            <div className="flex items-center h-fit">
                <Image src={geotera} blurDataURL={"@/assets/geotera.png"} alt="Geotera" className="w-20 h-20" priority />
                <p className="text-xl max-sm:hidden text-[#3B8565] -ml-5">Geotera</p>
            </div>
            <div className="flex items-center gap-7 max-sm:gap-3 max-sm:collapse">
                <Link href="/">Home</Link>
                <Link href="/">About</Link>
                <NotificationButton />
                <SignInOutButton />
            </div>
            <HamburgerButton />
        </nav>
    );
}
