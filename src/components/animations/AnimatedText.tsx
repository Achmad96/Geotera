"use client";
import { motion, useAnimation, useInView, Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { JSX } from "react";

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
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeInOut" },
    },
};

const AnimatedText = ({ text, el: Wrapper = "p", className, once, underlineWords, animation = defaultAnimations }: AnimatedTextProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once });
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    let delay = 0; // in seconds

    useEffect(() => {
        if (isInView) {
            controls.start("visible").then(r => r);
        } else {
            setIsAnimationComplete(false);
            controls.start("hidden").then(r => r);
        }
    }, [isInView, controls]);

    const handleAnimationComplete = (define: string) => {
        if (define === "hidden") {
            setIsAnimationComplete(false);
        } else {
            setIsAnimationComplete(true);
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
                    visible: {
                        ...animation.visible,
                        transition: { staggerChildren: 0.05 },
                    },
                    hidden: animation.hidden,
                }}
            >
                {text.split(" ").map((word, wordIndex) => {
                    if (underlineWords && wordIndex !== underlineWords[0]) {
                        if (wordIndex > underlineWords[0] && wordIndex <= underlineWords[1]) {
                            delay += 0.3;
                        }
                    }
                    const isUnderlined = function (a: string) {
                        const b = underlineWords && isAnimationComplete && wordIndex >= underlineWords[0];
                        return a === "space" ? b && wordIndex < underlineWords[1] : b && wordIndex <= underlineWords[1];
                    };

                    return (
                        <span
                            key={wordIndex}
                            style={{
                                transition: `background-size 0.5s ease-out ${delay}s`,
                            }}
                            className={`inline-block style-underline style-bg-underline ${isUnderlined("space") && "animate-underline"}`}
                        >
                            {word.split("").map((char, charIndex) => (
                                <motion.span
                                    key={charIndex}
                                    style={{
                                        transition: `background-size 0.5s ease-out ${delay}s`,
                                    }}
                                    className={`inline-block style-underline style-bg-underline
                                        ${isUnderlined("word") && "animate-underline"}`}
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
