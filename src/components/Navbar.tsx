import Image from "next/image";
import geotera from "@/assets/geotera.png";
import Link from "next/link";
import SignInOutButton from "@/components/SignInOutButton";

export default async function Navbar() {
    return (
        <nav className="flex items-center justify-between w-full h-20 px-6 max-sm:h-16 max-sm:px-3">
            <div className="flex items-center">
                <Image src={geotera} alt="Geotera" className="w-24 h-24" priority />
                <p className="text-xl max-sm:hidden">Geotera</p>
            </div>
            <div className="flex text-sm items-center gap-7 max-sm:gap-4">
                <Link href="/">Home</Link>
                <SignInOutButton />
            </div>
        </nav>
    );
}
