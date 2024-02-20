"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import ScrollDown from "@/components/arrows/scroll-down";

export default function IntroSection() {
  const title = "JG's Next.js Boilerplate";

  const fadeInAnimation = useMemo(
    () => ({
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    }),
    [],
  );

  const [step, setStep] = useState(0);

  const handleAnimationStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (step >= 3) {
      const body = document.getElementById("body");

      if (body) {
        body.classList.add("scroll");
      }
    }
  }, [step]);

  return (
    <section id="intro">
      <div className="px-4 pb-4 mx-auto h-screen-dvh max-w-8xl sm:px-6 md:px-8">
        <div className="relative flex flex-col items-center justify-center h-full">
          <motion.h1 className="sr-only">{title}</motion.h1>
          <motion.div
            className="mb-4 text-xl font-medium tracking-wider text-center sm:text-2xl"
            initial="hidden"
            animate={step >= 0 ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.1 }}
            onAnimationComplete={handleAnimationStep}
            aria-hidden
          >
            {title.split("").map((char, i) =>
              char === " " ? (
                <Fragment key={`${char}_${i}`}>&nbsp;</Fragment>
              ) : (
                <motion.span
                  className="inline-block"
                  key={`${char}_${i}`}
                  variants={fadeInAnimation}
                >
                  {char}
                </motion.span>
              ),
            )}
          </motion.div>
          <motion.div
            className="text-sm text-center text-gray-400 mb-14 sm:text-xl"
            initial="hidden"
            animate={step >= 1 ? "visible" : "hidden"}
            onAnimationComplete={handleAnimationStep}
          >
            <motion.p variants={fadeInAnimation}>
              Start front-end development with feature-packed, Next.js
              boilerplate.
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute bottom-24"
            initial="hidden"
            animate={step >= 2 ? "visible" : "hidden"}
            transition={{ delayChildren: 0.1 }}
            onAnimationComplete={handleAnimationStep}
          >
            <motion.div variants={fadeInAnimation}>
              <ScrollDown />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
