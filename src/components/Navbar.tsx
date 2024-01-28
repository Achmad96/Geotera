import Image from "next/image";
import geotera from "@/assets/geotera.png";
import Link from "next/link";
import SignInOutButton from "@/components/button/SignInOutButton";

export default async function Navbar() {
    return (
        <nav className="flex w-full h-[10dvh] items-center justify-between px-6 max-sm:px-3">
            <div className="flex items-center">
                <Image src={geotera} blurDataURL={"@/assets/geotera.png"} alt="Geotera" width={70} height={70} style={{ width: "auto", height: "auto" }} priority />
                <p className="text-xl max-sm:hidden text-[#3B8565] -ml-5">Geotera</p>
            </div>
            <div className="flex items-center gap-7 max-sm:gap-3">
                <Link href="/">Home</Link>
                <Link href="/">About</Link>
                <SignInOutButton />
            </div>
        </nav>
    );
}
