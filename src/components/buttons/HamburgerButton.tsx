"use client";
import { useContext, useState } from "react";
import { Variants, motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

const itemVariant: Variants = {
    open: {
        opacity: 1,
        y: 0,
        display: "",
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, display: "none", transition: { duration: 0.3 } },
};

const DropdownLeft = ({ isOpenState }: { isOpenState: [boolean, Function] }) => {
    const [isMenuOpen, setIsMenuOpen] = isOpenState;
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const router = useRouter();

    const handleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                router.refresh();
            })
            .catch((err: any) => console.log(err.message));
    };
    const handleSignOut = () => {
        signOut()
            .then(() => {
                router.refresh();
            })
            .catch((err: any) => console.log(err.message));
    };

    return (
        <motion.ul
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
                open: {
                    opacity: 1,
                    y: 10,
                    x: 0,
                    display: "",
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.1,
                        staggerChildren: 0.2,
                    },
                },

                closed: {
                    opacity: 0,
                    x: 50,
                    display: "none",
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3,
                        delayChildren: 0.3,
                    },
                },
            }}
            className="flex flex-col absolute right-0 z-[1] menu p-2 mr-3 [&>*]:p-2 shadow bg-base-100 text-center rounded-box w-[80%]"
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
                    !isAuth ? handleSignIn() : handleSignOut();
                }}
            >
                {isAuth ? "Sign out" : "Sign in with Google"}
            </motion.li>
        </motion.ul>
    );
};

export default function HamburgerButton() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    return (
        <div className="sm:collapse sm:hidden">
            <label className="daisy-btn daisy-btn-circle daisy-swap daisy-swap-rotate">
                <input type="checkbox" checked={isMenuOpen} onChange={() => setIsMenuOpen(!isMenuOpen)} />
                <svg className="daisy-swap-off daisy-fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <svg className="daisy-swap-on daisy-fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
            </label>
            <DropdownLeft isOpenState={[isMenuOpen, setIsMenuOpen]} />
        </div>
    );
}
