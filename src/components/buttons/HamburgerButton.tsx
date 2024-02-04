"use client";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import { handleSignIn, handleSignOut } from "@/components/buttons/SignInOutButton";
import { useRouter } from "next/navigation";

const itemVariant: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const DropdownLeft = ({ isOpenState }: { isOpenState: [boolean, Function] }) => {
    const [isMenuOpen, setIsMenuOpen] = isOpenState;
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const router = useRouter();

    return (
        <motion.ul
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
                open: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.1,
                    },
                },

                closed: {
                    opacity: 0,
                    x: 50,
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3,
                    },
                },
            }}
            className="flex flex-col absolute right-0 z-[1] menu p-2 [&>*]:p-2 shadow bg-base-100 text-center rounded-box w-[80%]"
        >
            <motion.a variants={itemVariant} href="#home" onClick={() => setIsMenuOpen(false)}>
                Home
            </motion.a>
            <motion.a variants={itemVariant} href="#about" onClick={() => setIsMenuOpen(false)}>
                About
            </motion.a>
            <motion.li variants={itemVariant} onClick={() => setIsMenuOpen(false)}>
                Notifications
            </motion.li>
            <motion.li
                variants={itemVariant}
                onClick={() => {
                    setIsMenuOpen(false);
                    if (!isAuth) {
                        handleSignIn();
                        router.push("/");
                    } else {
                        handleSignOut();
                        router.push("/");
                        router.refresh();
                    }
                }}
            >
                {isAuth ? "Sign out" : "Sign in"}
            </motion.li>
        </motion.ul>
    );
};

export default function HamburgerButton() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    return (
        <div className="sm:collapse sm:hidden">
            <GiHamburgerMenu className="w-6 h-6" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <DropdownLeft isOpenState={[isMenuOpen, setIsMenuOpen]} />
        </div>
    );
}
