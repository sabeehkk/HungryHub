import React from "react";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PacmanLoader color="hsla(59, 81%, 55%, 1)" size={25} />
      <p className="text-gray-600 mt-4">Loading...</p>
    </div>
  );
};

export default Loading;
