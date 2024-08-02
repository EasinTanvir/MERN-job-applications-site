import React from "react";
import { Blocks, Circles, RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <RotatingLines
        visible={true}
        height="70"
        width="70"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <span>Please wait...</span>
    </div>
  );
};

export default Loader;
