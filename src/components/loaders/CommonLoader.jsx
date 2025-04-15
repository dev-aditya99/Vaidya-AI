import React from "react";

const CommonLoader = ({ className, borderSize }) => {
  return (
    <div
      className={`${
        borderSize ? borderSize : "border-4"
      } border-t-themeBoxBgColorLighter border-gray-300 rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default CommonLoader;
