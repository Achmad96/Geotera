"use client";
import { motion, useAnimation, useInView, Variant } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

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

const AnimatedText = memo(({ text, el: Wrapper = "p", className, once, underlineWords, animation = defaultAnimations }: AnimatedTextProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once });
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            setIsAnimationComplete(false);
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const handleIsAnimationComplete = (define: string) => {
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
                onAnimationComplete={handleIsAnimationComplete}
                variants={{
                    visible: { ...animation.visible, transition: { staggerChildren: 0.05 } },
                    hidden: animation.hidden,
                }}
            >
                {text.split(" ").map((word, wordIndex) => {
                    const stagger = wordIndex / 10;
                    return (
                        <span
                            key={wordIndex}
                            style={{
                                transition: `background-size ${stagger}s ease-out`,
                            }}
                            className={`inline-block style-underline style-bg-underline ${
                                underlineWords && isAnimationComplete && wordIndex >= underlineWords[0] && wordIndex <= underlineWords[1] && "animate-underline"
                            }`}
                        >
                            {word.split("").map((char, charIndex) => (
                                <motion.span
                                    key={charIndex}
                                    style={{
                                        transition: `background-size ${stagger + 0.3}s ease-out`,
                                    }}
                                    className={`inline-block
                                        style-underline style-bg-underline
                                        ${isAnimationComplete && underlineWords?.includes(wordIndex) && "animate-underline"}
                                    `}
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
});

export default AnimatedText;
