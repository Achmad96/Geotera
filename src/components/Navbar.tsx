import Image from "next/image";
import geotera from "@/assets/geotera.png";
import Link from "next/link";
import SignInOutButton from "@/components/button/SignInOutButton";

export default async function Navbar() {
    return (
        <nav className="flex items-center justify-between w-full h-[10dvh] px-6">
            <div className="flex items-center">
                <Image src={geotera} blurDataURL={"@/assets/geotera.png"} alt="Geotera" width={70} height={70} style={{ width: "auto", height: "auto" }} priority />
                <p className="text-xl max-sm:hidden">Geotera</p>
            </div>
            <div className="flex text-base items-center gap-7 max-sm:gap-3">
                <Link href="/">Home</Link>
                <SignInOutButton />
            </div>
        </nav>
    );
}
