"use client";

import { Dispatch, useState } from "react";
import { Variants, motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";

const itemVariant: Variants = {
  open: {
    opacity: 1,
    x: 0,
    display: "",
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  closed: { opacity: 0, x: 50 },
};

const DropdownLeft = ({
  isOpenState,
  handlerSign,
}: {
  isOpenState: [boolean, Dispatch<boolean>];
  handlerSign: Function;
}) => {
  const [isMenuOpen, setIsMenuOpen] = isOpenState;
  const { isAuth } = useAuth();
  return (
    <motion.ul
      className="absolute right-3 top-16 z-[1] flex h-52 w-[90%] flex-col justify-center gap-2 rounded-box border bg-base-100 text-center shadow [&>*]:p-2"
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      variants={{
        open: {
          opacity: 1,
          y: 0,
          display: "",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3,
            delayChildren: 0.1,
            staggerChildren: 0.2,
          },
        },

        closed: {
          opacity: 0,
          y: -50,
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3,
          },
          transitionEnd: {
            display: "none",
          },
        },
      }}
    >
      <motion.a
        variants={itemVariant}
        href="#home"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </motion.a>
      <motion.a
        variants={itemVariant}
        href="#about"
        onClick={() => setIsMenuOpen(false)}
      >
        About
      </motion.a>
      <motion.li variants={itemVariant} onClick={() => setIsMenuOpen(false)}>
        Notifications
      </motion.li>
      <motion.li
        variants={itemVariant}
        onClick={async () => {
          setIsMenuOpen(false);
          handlerSign();
        }}
      >
        {isAuth ? "Sign out" : "Sign in"}
      </motion.li>
    </motion.ul>
  );
};

export default function HamburgerButton({
  handlerSign,
}: {
  handlerSign: Function;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="sm:collapse sm:hidden">
      <label className="daisy-btn daisy-btn-circle daisy-swap daisy-swap-rotate">
        <input
          type="checkbox"
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen(!isMenuOpen)}
        />
        <svg
          className="daisy-fill-current daisy-swap-off"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
        <svg
          className="daisy-fill-current daisy-swap-on"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
      <DropdownLeft
        handlerSign={handlerSign}
        isOpenState={[isMenuOpen, setIsMenuOpen]}
      />
    </div>
  );
}
