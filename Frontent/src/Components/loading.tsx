import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="hsla(59, 81%, 55%, 1)" />
    </div>
  );
};

export default Loading;
