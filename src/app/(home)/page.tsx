"use client";

import features from "@/data/features";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { motion, useInView } from "framer-motion";
import { MoveRight } from "lucide-react";

import ScrollContainer from "@/components/layout/scroll-container";
import ScrollDown from "@/components/arrows/scroll-down";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const defaultAnimation = useMemo(
    () => ({
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    }),
    []
  );

  const featureArticleRef = useRef(null);
  const isInViewFeatureArticle = useInView(featureArticleRef, { amount: 0.1, once: true });

  const startArticleRef = useRef(null);
  const isInViewStartArticle = useInView(startArticleRef, { amount: 0.75, once: true });

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

  const title = "JG's Next.js Boilerplate";

  return (
    <ScrollContainer>
      <main>
        <section id="vision">
          <article id="intro">
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
                      <motion.span className="inline-block" key={`${char}_${i}`} variants={defaultAnimation}>
                        {char}
                      </motion.span>
                    )
                  )}
                </motion.div>
                <motion.div
                  className="text-sm text-center text-gray-400 mb-14 sm:text-xl"
                  initial="hidden"
                  animate={step >= 1 ? "visible" : "hidden"}
                  onAnimationComplete={handleAnimationStep}
                >
                  <motion.p variants={defaultAnimation}>Start front-end development with feature-packed, Next.js boilerplate.</motion.p>
                </motion.div>
                <motion.div
                  className="absolute bottom-24"
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delayChildren: 0.1 }}
                  onAnimationComplete={handleAnimationStep}
                >
                  <motion.div variants={defaultAnimation}>
                    <ScrollDown />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </article>
          <article id="feature">
            <div className="px-4 pb-4 mx-auto xl:min-h-screen-dvh max-w-8xl sm:px-6 md:px-8">
              <div className="relative flex flex-col items-center justify-center">
                <motion.div
                  className="grid w-full grid-cols-1 grid-rows-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                  ref={featureArticleRef}
                  initial="hidden"
                  animate={isInViewFeatureArticle ? "visible" : "hidden"}
                  transition={{ staggerChildren: 0.25 }}
                >
                  {features.map((feature, i) => (
                    <motion.div
                      className="flex flex-col items-center self-start justify-center gap-6 p-6 overflow-hidden"
                      key={`${feature}_${i}`}
                      variants={defaultAnimation}
                      transition={{ duration: 1.25 }}
                    >
                      <div className="flex items-center justify-center w-16 h-16 bg-blue-700 rounded-md">
                        <Image src={feature.imgSrc} alt={feature.imgAlt} width={36} height={36} />
                      </div>
                      <div className="flex flex-col text-center gap-y-4">
                        <div className="text-base sm:text-xl">
                          <p>{feature.key}</p>
                        </div>
                        <div className="text-sm text-gray-400 sm:text-base">
                          <p>{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </article>
          <article id="start">
            <div className="px-4 pb-4 mx-auto h-[600px] sm:min-h-screen-dvh max-w-8xl sm:px-6 md:px-8">
              <div className="relative flex flex-col items-center justify-center h-full">
                <motion.div
                  ref={startArticleRef}
                  initial="hidden"
                  animate={isInViewStartArticle ? "visible" : "hidden"}
                  transition={{ delayChildren: 0.1 }}
                >
                  <motion.div className="flex flex-col items-center w-full" variants={defaultAnimation} transition={{ duration: 2 }}>
                    <Button
                      variant="outline"
                      className="h-auto p-0 text-base font-medium uppercase transition-colors border border-blue-600 rounded-lg hover:bg-inherit hover:border-blue-600/80"
                    >
                      <Link href="/docs" className="flex h-12 px-12 py-3 [&>svg]:hover:animate-wobble ">
                        <span className="mr-3">Learn more</span>
                        <MoveRight />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </ScrollContainer>
  );
}
