import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const CommonExpandBox = ({
  children,
  className = "",
  buttonTitle = "",
  styleButtonTitle = "",
  buttonIcon = null,
  styleButtonIcon = "",
  styleOptionBox = "",
  isShowMoreState,
}) => {
  // Refs for the expand box and options box
  const expandBoxRef = useRef(null);
  const optionsBoxRef = useRef(null);

  // State to manage visibility of the options
  const [isShowMoreOptions, setIsShowMoreOptions] = useState(false);

  // Generate unique ID for the options box
  const uniqueId = React.useId();

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (expandBoxRef.current && !expandBoxRef.current.contains(e.target)) {
        setIsShowMoreOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manage visibility and transitions
  useEffect(() => {
    if (optionsBoxRef.current) {
      if (isShowMoreOptions) {
        optionsBoxRef.current.style.visibility = "visible";
        optionsBoxRef.current.style.opacity = "1";
        optionsBoxRef.current.style.transform = "scaleY(1)";
      } else {
        optionsBoxRef.current.style.opacity = "0";
        optionsBoxRef.current.style.transform = "scaleY(0.95)";
        setTimeout(() => {
          if (optionsBoxRef.current) {
            optionsBoxRef.current.style.visibility = "hidden";
          }
        }, 200);
      }
    }
  }, [isShowMoreOptions]);

  // Toggle options box visibility
  const showOptionsBoxHandler = () => {
    setIsShowMoreOptions((prev) => !prev);
  };

  // change show more option state
  useEffect(() => {
    setIsShowMoreOptions(isShowMoreState);
  }, [isShowMoreState]);

  return (
    <div ref={expandBoxRef} tabIndex={0} className={`relative ${className}`}>
      {/* Select Button */}
      <button
        onClick={showOptionsBoxHandler}
        className={
          typeof buttonIcon == "string"
            ? "w-8 h-8 flex items-center justify-center rounded-full overflow-hidden hover:opacity-75 focus-within:opacity-75 duration-200"
            : `w-full py-2 px-4 text-sm capitalize font-medium flex items-center justify-between gap-2 rounded-full active:bg-transparent relative ${
                isShowMoreOptions ? "bg-white/[0.1]" : "hover:bg-white/[0.1]"
              }`
        }
        aria-expanded={isShowMoreOptions}
        aria-controls={`options-box-${uniqueId}`}
      >
        {typeof buttonIcon == "string" ? (
          <img
            src={buttonIcon || ""}
            alt="profile_pic_404"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <span className={`${styleButtonIcon}`}>{buttonIcon}</span>
        )}

        {buttonTitle && <span className={styleButtonTitle}>{buttonTitle}</span>}
      </button>

      {/* Options Box */}
      <div
        ref={optionsBoxRef}
        id={`options-box-${uniqueId}`}
        role="menu"
        aria-hidden={!isShowMoreOptions}
        className={`min-w-[160px] max-h-[50vh] py-3 bg-[#171a37] text-base rounded-lg shadow-md absolute top-full right-0 z-10 select-none origin-top transition-all duration-200 overflow-auto transform scale-y-95 opacity-0 invisible ${styleOptionBox}`}
      >
        <ul className="w-full h-full text-gray-200 font-medium text-left">
          {children}
        </ul>
      </div>
    </div>
  );
};

CommonExpandBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  buttonTitle: PropTypes.string,
  styleButtonTitle: PropTypes.string,
  buttonIcon: PropTypes.node,
  styleButtonIcon: PropTypes.string,
  styleOptionBox: PropTypes.string,
};

export default CommonExpandBox;
