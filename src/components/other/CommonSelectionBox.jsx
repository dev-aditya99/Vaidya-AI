import React, { useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const CommonSelectionBox = ({ className, optionsArr, takeChoosenOption }) => {
  // refs
  const dropdownRef = useRef(null);
  const selectedOptionRef = useRef(null);

  //   useStates
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedOptionName, setSelectedOptionName] = useState("Private");

  //   functions
  // handle blur for select btn options
  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropDownOpen(false);
    }
  };

  // handle option select to take option
  const handleOptionSelect = (option) => {
    setIsDropDownOpen(false);
    setSelectedOptionName(option);
    if (takeChoosenOption) {
      takeChoosenOption(option);
    }
  };

  // handle select btn click theme
  const handleSelectButtonClick = () => {
    setIsDropDownOpen((prev) => !prev);
    // Trigger scrollIntoView after dropdown opens
    if (!isDropDownOpen && selectedOptionRef.current) {
      setTimeout(() => {
        selectedOptionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  };

  return (
    <div
      ref={dropdownRef}
      tabIndex={0} // Make div focusable
      className={`relative border border-gray-400/25 rounded-lg ${
        !isDropDownOpen && "hover:border-gray-400"
      } ${className}`}
      onBlur={handleBlur}
    >
      {/* Select Button */}
      <button
        onClick={handleSelectButtonClick}
        className={`w-full py-2 px-4 text-sm capitalize font-medium flex items-center justify-between gap-2 rounded-lg hover:bg-white/[0.1] active:bg-transparent relative ${
          isDropDownOpen
            ? "border-2 border-themeColor2 text-themeColor2"
            : "border-2 border-transparent"
        }`}
      >
        {selectedOptionName}
        <MdOutlineArrowDropDown className="text-2xl" />
      </button>

      {/* Dropdown Options */}
      <div
        className={`w-full max-h-[50vh] py-3 bg-[#171a37] text-base rounded-lg shadow-md absolute top-full left-0 z-10 select-none origin-top transition-transform duration-200 overflow-auto ${
          isDropDownOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <ul className="w-full h-full text-gray-200 font-medium text-left">
          {/* options  */}
          {optionsArr?.map((option, index) => (
            <li
              key={index}
              ref={option === selectedOptionName ? selectedOptionRef : null}
              tabIndex={0} // Make each option focusable
              className={`w-full py-2 pl-5 pr-2  cursor-pointer ${
                selectedOptionName == option
                  ? "bg-[#373c64]"
                  : "hover:bg-[#242848]"
              }`}
              onClick={() => handleOptionSelect(option)}
              autoFocus={selectedOptionName == option ? true : false}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommonSelectionBox;
