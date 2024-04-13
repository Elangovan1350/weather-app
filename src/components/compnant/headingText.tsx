"use client";

import React from "react";
import { motion } from "framer-motion";
import stringToArray from "@/utils/stringToArray";

const headingString = "Weather App";
const para =
  "In this app you can see table of city and filter them. Search your city and see the weather and we can check all city weather in a country.";

const HeadingText = () => {
  const heading = stringToArray(headingString);
  const paragraph = stringToArray(para);
  const textVarient = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <div className="text-3xl font-semibold text-center w-full sm:w-1/2 px-3 sm:px-0">
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.5, repeat: Infinity, delay: 1 }}
      >
        {heading.map((char, i) => {
          return (
            <motion.span
              variants={textVarient}
              transition={{ duration: 0.5 }}
              key={i}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.div>
      <motion.div
        className="text-lg font-normal"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1, repeat: Infinity, delay: 1 }}
      >
        {paragraph.map((char, i) => {
          return (
            <motion.span
              variants={textVarient}
              transition={{ duration: 0.3 }}
              key={i}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HeadingText;
