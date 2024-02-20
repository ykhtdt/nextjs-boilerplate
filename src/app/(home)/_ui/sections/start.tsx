"use client";

import { useRef } from "react";
import Link from "next/link";

import { motion, useInView } from "framer-motion";
import { MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function StartSection() {
  const fadeInAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const sectionRef = useRef(null);
  const isInViewSection = useInView(sectionRef, { amount: 0.75, once: true });

  return (
    <section id="start">
      <div className="px-4 pb-4 mx-auto h-[600px] sm:min-h-screen-dvh max-w-8xl sm:px-6 md:px-8">
        <div className="relative flex flex-col items-center justify-center h-full">
          <motion.div
            ref={sectionRef}
            initial="hidden"
            animate={isInViewSection ? "visible" : "hidden"}
            transition={{ delayChildren: 0.1 }}
          >
            <motion.div
              className="flex flex-col items-center w-full"
              variants={fadeInAnimation}
              transition={{ duration: 2 }}
            >
              <Button
                variant="outline"
                className="h-auto p-0 text-base font-medium uppercase transition-colors border border-blue-600 rounded-lg hover:bg-inherit hover:border-blue-600/80"
              >
                <Link
                  href="/docs"
                  className="flex h-12 px-12 py-3 [&>svg]:hover:animate-wobble "
                >
                  <span className="mr-3">Learn more</span>
                  <MoveRight />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
