import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { MdArrowBackIos } from "react-icons/md";
import Container from "../../other/Container";
import { useAuthContext } from "../../../context/AuthContext";

const Header = () => {
  // states
  // get path
  const { currentPath, setCurrentPath, backendBaseURL } = useAuthContext();
  const [isSideBar, setIsSideBar] = useState(false);

  // useEffects
  useEffect(() => {
    setIsSideBar(false);
  }, [currentPath]);

  // useEffect for hide body overflow
  useEffect(() => {
    if (isSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSideBar]);

  // navbar link list
  const navbarLinkLists = [
    {
      linkName: "Symptoms Analyzer",
      url: "/symptoms-analyzer",
    },
    {
      linkName: "Find Disease",
      url: "/scan-disease",
    },
    {
      linkName: "First Aid",
      url: "/find-first-aid",
    },
  ];
  return (
    <>
      {/* header  */}
      <header
        className={`w-full ${
          currentPath == "/"
            ? "min-[956px]:h-screen sm:h-[90vh] bg-[#E7F0FF]"
            : "bg-white border-b border-gray-200 py-2 sticky top-0"
        }  px-3 `}
      >
        <Container className={"h-full mx-auto"}>
          {/* navbar  */}
          <nav
            className={`${
              currentPath == "/" ? "bg-[#E7F0FF]" : ""
            } w-full h-[10vh]  flex items-center justify-between gap-2`}
          >
            {/* left side  */}
            <div className="w-full text-[18px] flex items-center justify-start sm:gap-4">
              <h1 className=" text-[#2AA8FF] sm:text-2xl text-base font-bold cursor-pointer">
                Vaidya AI
              </h1>
            </div>

            {/* right side  */}
            <div className="w-full sm:block hidden">
              <ul className="w-full flex items-center justify-end gap-8 text-[#102851] text-[14px]">
                {navbarLinkLists?.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <Link
                        to={item?.url}
                        className="hover:text-[#121925] duration-200"
                      >
                        {item?.linkName}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link to="/" className="text-lg text-[#2AA8FF]">
                    <TiHome />
                  </Link>
                </li>
              </ul>
            </div>

            {/* right side mobile */}
            <div className="w-full sm:hidden flex items-center justify-end ">
              {/* sidebar menu btn  */}
              <button
                className="p-2 bg-[#2AA8FF] text-white text-xl rounded-full cursor-pointer"
                onFocus={() => setIsSideBar(true)}
                // onBlur={() => setIsSideBar(false)}
              >
                <RiMenu3Fill />
              </button>

              {/* side bar faded black bg */}
              <div
                className={`${
                  isSideBar ? "visibe opacity-100 " : "opacity-0 invisible"
                } w-screen h-screen bg-black/75 absolute top-0 left-0 backdrop-blur-sm z-[999] duration-200`}
                onClick={() => setIsSideBar(false)}
              >
                {/* sidebar  */}
                <div
                  className={`min-[300px]:w-[300px] w-full h-screen bg-white shadow-2xl absolute top-0 ${
                    isSideBar ? "left-0" : "left-[-100%]"
                  } duration-200`}
                >
                  {/* sidebar top #01538e */}
                  <div className="w-full py-3 px-2 bg-[#01538e] flex items-center justify-center flex-col gap-2">
                    {/* back btn  */}
                    <div className="py-1 px-2 w-full text-xl text-white flex items-center justify-start">
                      <button
                        className="p-2 hover:bg-gray-50/25 flex items-center justify-center text-center rounded-full cursor-pointer duration-200"
                        onClick={() => setIsSideBar(false)}
                      >
                        <MdArrowBackIos />
                      </button>
                    </div>
                    {/* profile circle  */}
                    <div className="w-18 h-18 rounded-full bg-white border-2 border-white overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="profile-image"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* profile name  */}
                    <p className="font-medium text-white">Aditya Sharma</p>
                  </div>

                  {/* sidebar menu  */}
                  <div className="mt-2 w-full h-full overflow-auto">
                    <ul className="px-2 w-full flex items-center justify-start flex-col gap-2 text-[#102851] text-[14px]">
                      {/* home text-[#2AA8FF]  */}
                      <li className="w-full">
                        <Link
                          to="/"
                          className="w-full py-4 px-4 hover:text-[#121925] border border-gray-300 hover:bg-gray-100 rounded-2xl duration-200 flex items-center justify-start gap-2"
                        >
                          <TiHome className="text-lg" /> Home
                        </Link>
                      </li>

                      {navbarLinkLists?.map((item, idx) => {
                        return (
                          <li key={idx} className="w-full">
                            <Link
                              to={item?.url}
                              className="w-full block py-4 px-4 hover:text-[#121925] border border-gray-300 hover:bg-gray-100 rounded-2xl duration-200"
                            >
                              {item?.linkName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {currentPath == "/" && (
            <>
              {/* hero sections */}
              <div className="sm:h-[90vh] mt-7 sm:pt-3 py-3 flex items-start">
                {/* left hero sections  */}
                <div className="sm:w-[50%] w-full">
                  {/* hero upper line  */}
                  <p className="text-[#102851] min-[1101px]:text-[31px] min-[915px]:text-[26px] min-[380px]:text-[20px] text-[15px] font-medium">
                    Easy way to Identify Your Disease
                  </p>

                  {/* hero main line  */}
                  <p className="text-black font-bold min-[1101px]:text-[56px] min-[915px]:text-[46px] min-[721px]:text-[36px] min-[640px]:text-[29px] min-[466px]:text-[46px] min-[380px]:text-[36px] text-[28px] leading-[1.1]">
                    Your <span className="text-[#2AA7FF]">AI Healthcare</span>{" "}
                    Assistant
                  </p>

                  {/* hero sub line  */}
                  <p className="text-[#5C6169] min-[915px]:text-[20px] md:text-[16px] text-[14px] font-normal">
                    Identify you diseases and get Precautions & Suggestions
                    instantlly.
                  </p>

                  {/* try now btn  */}
                  <button className="sm:mt-6 mt-4 sm:px-8 px-4 sm:py-3 py-2 bg-[#2AA8FF] text-white sm:text-[16px] text-[14px] font-medium rounded-2xl hover:bg-[#0095fc] cursor-pointer duration-200">
                    Try Now
                  </button>
                </div>

                {/* right hero section - image  */}
                <div className="sm:w-[50%] h-full sm:flex hidden">
                  {/* image  */}
                  <img
                    src={`${backendBaseURL}/images/Hero_sections__doctor-svg_336282 1.svg"`}
                    alt="hero_image"
                    className="min-[915px]:object-contain object-cover object-left drop-shadow-xl"
                  />
                </div>
              </div>
            </>
          )}
        </Container>
      </header>
    </>
  );
};

export default Header;
