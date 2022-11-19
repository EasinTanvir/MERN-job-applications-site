import { Spinner } from "@chakra-ui/react";
import React from "react";

const Spinners = ({ text }) => {
  return (
    <div className={`${text ? "" : "spin"}`}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      ;
    </div>
  );
};

export default Spinners;
