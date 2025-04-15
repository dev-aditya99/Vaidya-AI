import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordToggleButton = ({ targetId, className }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
    const inputElement = document.getElementById(targetId);
    if (inputElement) {
      inputElement.type = isPasswordVisible ? "password" : "text";
    }
  };

  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className={`absolute right-2 bg-transparent border-none focus:outline-none ${className}`}
      aria-label="Toggle password visibility"
    >
      {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

PasswordToggleButton.propTypes = {
  targetId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default PasswordToggleButton;
