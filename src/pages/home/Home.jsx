import React from "react";
import Container from "../../components/other/Container";

import { LuScanSearch } from "react-icons/lu";
import { FaRegHospital } from "react-icons/fa6";
import { TbFirstAidKit } from "react-icons/tb";
import { GoPencil } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // navigate
  const navigate = useNavigate();

  // quick feature list array
  const quickFeatureArr = [
    {
      featureName: "Scan Disease",
      icon: <LuScanSearch />,
      path: "/scan-disease",
    },
    {
      featureName: "Symptoms Analyzer",
      icon: <GoPencil />,
      path: "/symptoms-analyzer",
    },
    {
      featureName: "Firs Aid",
      icon: <TbFirstAidKit />,
      path: "/find-first-aid",
    },
    {
      featureName: "Available Hospitals",
      icon: <FaRegHospital />,
      path: "/",
    },
  ];
  return (
    <div className="w-full min-h-screen my-5">
      <Container className={"h-full mx-auto"}>
        {/* quick feature box  */}
        <div className="w-full flex items-center justify-center relative">
          <div className="w-[95%] py-8 px-5 bg-white rounded-md sm:absolute top-[-100px] z-20 shadow-2xl">
            <h2 className="w-full mb-5 text-center text-[20px] font-medium">
              You may be looking for
            </h2>
            <ul className="w-full flex items-center justify-around gap-2 flex-wrap">
              {quickFeatureArr?.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="sm:w-[200px] w-[150px] sm:py-8 py-5 bg-[#FAFBFE] rounded-md flex flex-col items-center gap-5 hover:bg-[#f2f3f4] cursor-pointer"
                    onClick={() => navigate(item?.path)}
                  >
                    {/* Icon */}
                    <span className="md:text-7xl text-5xl text-[#2AA7FF]">
                      {item?.icon}
                    </span>

                    {/* feature name  */}
                    <span className="text-[#ABB6C7] sm:text-[18px] text-[16px] font-normal text-center">
                      {item?.featureName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* other  */}
        <div className="w-full h-[500px] sm:block hidden"></div>
      </Container>
    </div>
  );
};

export default Home;
