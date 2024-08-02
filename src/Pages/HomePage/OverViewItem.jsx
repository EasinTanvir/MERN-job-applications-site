import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdPerson2 } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import WorkIcon from "@mui/icons-material/Work";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdWorkspacePremium } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
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
        <h3 className="font-montserrat flex gap-1 justify-center  items-center uppercase  text-slate-900 font-semibold">
          <span className="xl:text-2xl text-lg">{title}</span>
          <span>
            {title === "Total Clients" ? (
              <FaUsers className="xl:text-3xl text-lg" />
            ) : title === "Total Jobs" ? (
              <MdWorkspacePremium className="xl:text-3xl text-lg" />
            ) : (
              <BiSolidDollarCircle className="xl:text-3xl text-lg" />
            )}
          </span>
        </h3>
        <h1 className=" font-semibold  text-slate-600 font-metropolis xl:text-3xl text-lg ">
          {title === "Total Revenues" ? "$" : null}
          {data}
        </h1>
      </motion.div>
    </>
  );
};
