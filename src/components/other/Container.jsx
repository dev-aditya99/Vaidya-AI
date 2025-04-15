import React from "react";

const Container = ({ className, children }) => {
  return <div className={`w-full max-w-[1180px] ${className}`}>{children}</div>;
};

export default Container;
