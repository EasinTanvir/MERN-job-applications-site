import React from "react";
import { OvierViewItem } from "./OverViewItem";

const JobOverView = () => {
  return (
    <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
      <OvierViewItem title="Total Client" amount={120} />
      <OvierViewItem title="Total Job" amount={300} />
      <OvierViewItem title="Total Revenue" amount={500} />
    </div>
  );
};

export default JobOverView;
