import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdPerson2 } from "react-icons/md";

export const OvierViewItem = ({ title, amount }) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (data <= amount) {
        setData((prev) => prev + 1);
      }
    }, 4);
  }, [amount, data]);

  return (
    <>
      <motion.div
        transition={{ delay: 1000, duration: 0.8 }}
        className="w-80 space-y-4  text-center sm:text-start  px-4 py-4"
      >
        <h3 className="font-montserrat uppercase text-2xl text-slate-900 font-semibold">
          <span>{title}</span>
        </h3>
        <h1 className=" font-semibold  text-slate-600 font-metropolis text-3xl  ">
          {title === "Total Revenue" ? "$" : null}
          {data}
        </h1>
      </motion.div>
    </>
  );
};
