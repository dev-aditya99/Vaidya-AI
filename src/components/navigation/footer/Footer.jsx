import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full p-4 md:text-base text-sm bg-[#1B3C74] flex items-center justify-center flex-col gap-1 text-white border-t border-gray-100/[0.1]">
      <div className="w-full">
        <p className="flex items-center justify-center flex-wrap gap-2">
          <span> &copy; {currentYear} VaidyaAI. All rights reserved.</span>
        </p>
      </div>

      <div className="w-full flex items-center justify-center gap-2">
        <p>Built with</p>
        <FaHeart fill="#ffa844" /> by{" "}
        <a href="www.linkedin.com/in/dev-aditya99" className="underline">
          Aditya
        </a>
      </div>
    </footer>
  );
};

export default Footer;
