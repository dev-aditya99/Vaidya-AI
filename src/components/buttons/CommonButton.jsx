import React from "react";

const CommonButton = ({
  className,
  children,
  buttonTitle,
  buttonRef,
  onClick,
}) => {
  return (
    <button
      ref={buttonRef || null}
      className={`rounded-lg cursor-pointer duration-200 ${
        className ||
        "py-3 px-4 text-sm bg-[#2AA7FF] text-white hover:bg-[#0095fc] cursor-pointer duration-200"
      }`}
      onClick={onClick || ""}
    >
      {children || ""}
      {buttonTitle || ""}
    </button>
  );
};

export default CommonButton;
