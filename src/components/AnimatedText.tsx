"use client";
import { motion, useAnimation, useInView, Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedTextProps = {
    text: string;
    el?: keyof JSX.IntrinsicElements;
    className?: string;
    once?: boolean;
    underlineWords?: [number, number];
    animation?: {
        hidden: Variant;
        visible: Variant;
    };
};

const defaultAnimations = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

const AnimatedText = ({ text, el: Wrapper = "p", className, once, underlineWords, animation = defaultAnimations }: AnimatedTextProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once });
    const [animationComplete, setAnimationComplete] = useState(false); // Track animation completion

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            if (!once) setAnimationComplete(false);
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const handleAnimationComplete = (define: any) => {
        if (define === "visible") {
            setAnimationComplete(true);
        }
    };

    return (
        <Wrapper className={className}>
            <motion.span
                ref={ref}
                initial="hidden"
                animate={controls}
                onAnimationComplete={handleAnimationComplete}
                variants={{
                    visible: { ...animation.visible, transition: { staggerChildren: 0.05 } },
                    hidden: animation.hidden,
                }}
            >
                {text.split(" ").map((word, wordIndex) => {
                    const delay = wordIndex / 10;
                    return (
                        <span
                            key={wordIndex}
                            style={{
                                transition: `background-size ${delay + 0.1}s ease-out`,
                            }}
                            className={`inline-block style-underline style-bg-underline ${
                                underlineWords && animationComplete && wordIndex >= underlineWords[0] && wordIndex < underlineWords[1] && "animate-underline"
                            }`}
                        >
                            {word.split("").map((char, charIndex) => (
                                <motion.span
                                    key={charIndex}
                                    style={{
                                        transition: `background-size ${delay + 0.2}s ease-out`,
                                    }}
                                    className={`inline-block style-underline style-bg-underline ${animationComplete && underlineWords?.includes(wordIndex) && "animate-underline"}`}
                                    variants={animation}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </span>
                    );
                })}
            </motion.span>
        </Wrapper>
    );
};

export default AnimatedText;
