import React from "react";
import { TbMoodEmpty } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <div className="w-full h-screen text-xl text-[#0095fc]/75 flex flex-col items-center justify-center gap-2">
      <TbMoodEmpty className="text-5xl" />
      Page Not Found
    </div>
  );
};

export default PageNotFound;
