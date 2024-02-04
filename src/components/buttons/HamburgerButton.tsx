"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, Variants, motion } from "framer-motion";

const AnimatedMenu: Variants = {
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
        },
    },
    hidden: {
        opacity: 0,
        x: 50,
        transition: {
            duration: 0.5,
            delay: 0.7,
        },
    },
};

const DropdownLeft = ({ setIsMenuOpen }: { setIsMenuOpen: Function }) => {
    const AnimatedItem: Variants = {
        show: { opacity: 1, x: 0, transition: { delay: 0.3 } },
        hidden: { opacity: 0, x: 20, transition: { delay: 0.3 } },
    };
    return (
        <motion.ul initial="hidden" animate="show" exit="hidden" variants={AnimatedMenu} className="absolute right-0 z-[1] menu p-2 [&>*]:p-2 shadow bg-base-100 text-center rounded-box w-[80%]">
            <motion.li initial="hidden" animate="show" exit="hidden" variants={AnimatedItem} onClick={() => setIsMenuOpen(false)}>
                <a href="#home">Home</a>
            </motion.li>
            <motion.li initial="hidden" animate="show" exit="hidden" variants={AnimatedItem} onClick={() => setIsMenuOpen(false)}>
                <a href="#about">About</a>
            </motion.li>
            <motion.li initial="hidden" animate="show" exit="hidden" variants={AnimatedItem} onClick={() => setIsMenuOpen(false)}>
                Sign in
            </motion.li>
        </motion.ul>
    );
};

export default function HamburgerButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="sm:collapse sm:hidden">
            <GiHamburgerMenu className="w-6 h-6" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <AnimatePresence>{isMenuOpen && <DropdownLeft setIsMenuOpen={setIsMenuOpen} />}</AnimatePresence>
        </div>
    );
}
