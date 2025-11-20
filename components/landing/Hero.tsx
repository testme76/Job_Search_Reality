"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Missing{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Real Data on the
          </span>
          {" "}Job Market?
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
          A lot of new grads are stressed, doubting themselves, and wondering if their job search experience is normal.
        </p>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
          You can find individual stories on Reddit or LinkedIn, but <span className="text-blue-600 dark:text-blue-400"> no real dataset</span> to show what's actually typical.
        </p>
      </motion.div>
    </section>
  );
}
