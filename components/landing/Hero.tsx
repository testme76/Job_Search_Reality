"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
          You're Not Failing.
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            The Market Is Brutal.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
          I've sent out <span className="font-semibold text-gray-900 dark:text-white">500+ applications</span> and gotten <span className="font-semibold text-gray-900 dark:text-white">3 interviews, 0 offers</span>. For the longest time I thought something was wrong with me.
        </p>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 font-medium">
          Then I started talking to people and realized... <span className="text-blue-600 dark:text-blue-400">wait, is everyone going through this?</span>
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl px-8 py-6 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
        >
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            100+ anonymous responses
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
            Real data from real candidates
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
