import React from "react";

const CommonDialogBox = ({ children, className }) => {
  return (
    <div className="overlay flex items-center justify-center">
      <div
        className={`sm:min-w-[500px] py-5 px-4 rounded-lg shadow-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CommonDialogBox;
