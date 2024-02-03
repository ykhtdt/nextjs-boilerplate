"use client";

import features from "@/data/features";

import { useRef } from "react";
import Image from "next/image";

import { motion, useInView } from "framer-motion";

export default function FeatureSection() {
  const fadeInAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const sectionRef = useRef(null);
  const isInViewSection = useInView(sectionRef, { amount: 0.1, once: true });

  return (
    <section id="feature">
      <div className="px-4 pb-4 mx-auto xl:min-h-screen-dvh max-w-8xl sm:px-6 md:px-8">
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="grid w-full grid-cols-1 grid-rows-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
            ref={sectionRef}
            initial="hidden"
            animate={isInViewSection ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.25 }}
          >
            {features.map((feature, i) => (
              <motion.div
                className="flex flex-col items-center self-start justify-center gap-6 p-6 overflow-hidden"
                key={`${feature}_${i}`}
                variants={fadeInAnimation}
                transition={{ duration: 1.25 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-700 rounded-md">
                  <div className="relative w-9 h-9">
                    <Image src={feature.imgSrc} alt={feature.imgAlt} fill />
                  </div>
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
    </section>
  );
}
