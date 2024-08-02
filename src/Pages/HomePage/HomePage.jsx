import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Buttons from "../../utils/Buttons";
import Brands from "../../utils/Brands/Brands";
import Testimonial from "../../utils/Testimonial/Testimonial";
import Search from "./Search";
import JobOverView from "./JobOverView";

const fadeInFromTop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
};

const fadeInFromBotom2 = {
  hidden: { opacity: 0.2, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center">
      <div className="lg:w-[80%] w-full py-16  space-y-4  ">
        <motion.h1
          className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full sm:px-0 px-1"
          initial="hidden"
          animate="visible"
          variants={fadeInFromBotom2}
        >
          Discover countless opportunities that align with your passion
        </motion.h1>
        <h3 className="text-logoText md:text-2xl text-xl font-semibold text-slate-800 text-center sm:px-0 px-1">
          Start your journey to professional success with us today
        </h3>
        <p className="text-slate-700 text-center sm:w-[80%] w-full mx-auto sm:px-0  px-1">
          Whether you're a seasoned professional or just starting out, our
          platform connects you with top employers and exciting opportunities
          across various industries
        </p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
          className="flex items-center justify-center gap-3 py-6 sm:px-0 px-2"
        >
          <Search />
        </motion.div>
        <div className="flex items-center justify-center gap-3 pb-4 ">
          <>
            <Link to="/post">
              <Buttons className="sm:w-52 w-44 bg-rose-700 font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-6 py-[12px] rounded-sm">
                Post Job
              </Buttons>
            </Link>
            <Link to="/job/search">
              <Buttons className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-6 py-[12px] rounded-sm">
                Find Job
              </Buttons>
            </Link>
          </>
        </div>
        <div className="my-3 sm:mx-0 mx-2">
          <JobOverView />
        </div>
        .
        <div className="sm:pt-14 pt-0 xl:px-16 md:px-10 px-2">
          <h1 className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl  mx-auto text-center font-bold  w-full">
            More Reasons Company Around the world workable
          </h1>
          <Brands />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
