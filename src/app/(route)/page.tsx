"use client";

import features from "@/data/features";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { motion, useInView } from "framer-motion";
import { MoveRight } from 'lucide-react'

import { useAtomValue } from "jotai";
import { loadingAtom } from "@/state/atom/loading";

import ScrollContainer from "@/components/containers/scroll-container";
import ScrollDown from "@/components/arrows/scroll-down";

import { Button } from "@/components/ui/button";


/**
* @todo: 세션스토리지로 해당 페이지를 이미 본 경우 애니메이션 비활성화
*/
export default function Home() {
  const { isStarted } = useAtomValue(loadingAtom);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const defaultAnimations = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const featureArticleRef = useRef(null);
  const isInViewFeatureArticle = useInView(featureArticleRef, { amount: 0.1, once: true });

  const startArticleRef = useRef(null);
  const isInViewStartArticle = useInView(startArticleRef, { amount: 0.75, once: true });

  const handleTitleAnimationComplete = (animation: string | string[]) => {
    if (animation === "visible") {
      setIsCompleted(true);
    }
  };

  const handleScrollDownLoad = (animation: string | string[]) => {
    if (animation === "visible") {
      setIsScrollable(true);
    }
  };

  useEffect(() => {
    const body = document.getElementById("body");
    if (isScrollable) {
      if (body) {
        body.classList.add("scroll");
      }
    }
  }, [isScrollable]);

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
                  animate={isStarted ? "visible" : "hidden"}
                  transition={{ staggerChildren: 0.1 }}
                  onAnimationComplete={handleTitleAnimationComplete}
                  aria-hidden
                >
                  {title.split("").map((char, i) =>
                    char === " " ? (
                      <Fragment key={`${char}_${i}`}>&nbsp;</Fragment>
                    ) : (
                      <motion.span className="inline-block" key={`${char}_${i}`} variants={defaultAnimations}>
                        {char}
                      </motion.span>
                    )
                  )}
                </motion.div>
                <motion.div
                  className="text-sm text-center text-gray-400 mb-14 sm:text-xl"
                  initial="hidden"
                  animate={isCompleted ? "visible" : "hidden"}
                >
                  <motion.p variants={defaultAnimations}>Start front-end development with feature-packed, Next.js boilerplate.</motion.p>
                </motion.div>
                <motion.div
                  className="absolute bottom-24"
                  initial="hidden"
                  animate={isCompleted ? "visible" : "hidden"}
                  transition={{ delayChildren: 0.1 }}
                  onAnimationComplete={handleScrollDownLoad}
                >
                  <motion.div variants={defaultAnimations}>
                    <ScrollDown />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </article>
          <article id="feature">
            <div className="px-4 pb-4 mx-auto sm:h-screen-dvh max-w-8xl sm:px-6 md:px-8">
              <div className="relative flex flex-col items-center justify-center h-auto sm:h-full">
                <motion.div
                  className="grid w-full grid-cols-1 grid-rows-3 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3"
                  ref={featureArticleRef}
                  initial="hidden"
                  animate={isInViewFeatureArticle ? "visible" : "hidden"}
                  transition={{ staggerChildren: 0.25 }}
                >
                  {features.map((feature, i) => (
                    <motion.div
                      className="flex flex-col items-center self-start justify-center gap-6 p-6 overflow-hidden"
                      key={`${feature}_${i}`}
                      variants={defaultAnimations}
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
            <div className="px-4 pb-4 mx-auto sm:h-screen-dvh max-w-8xl sm:px-6 md:px-8">
              <div className="relative flex flex-col items-center justify-center h-auto sm:h-full">
                <motion.div
                  ref={startArticleRef}
                  initial="hidden"
                  animate={isInViewStartArticle ? "visible" : "hidden"}
                  transition={{ delayChildren: 0.1 }}
                >
                  <motion.div className="flex flex-col items-center w-full" variants={defaultAnimations} transition={{ duration: 2 }}>
                    <h2 className="mb-12 font-bold tracking-wide sm:text-4xl">View with examples</h2>
                    <Button variant="outline" className="h-auto p-0 text-base font-medium uppercase transition-colors border border-blue-600 rounded-lg hover:bg-inherit hover:border-blue-600/80">
                      <Link href="/examples" className="flex h-12 px-12 py-3 [&>svg]:hover:animate-wobble ">
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
