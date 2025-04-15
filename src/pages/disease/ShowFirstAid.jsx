import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { marked } from "marked";

const ShowFirstAid = () => {
  // context
  const { geminiResponse, setGeminiResponse } = useAuthContext();

  //   useEffect
  useEffect(() => {
    const res = localStorage.getItem("diease-details");
    const parsedHTML = marked.parse(JSON.parse(res) || "");
    setGeminiResponse(parsedHTML);
  }, []);

  useEffect(() => {
    const paragraph = document.getElementsByTagName("p");
    // paragraph.style.marginBottom = "11px";
  }, [geminiResponse]);
  return (
    <>
      {/* heading  */}
      <h2 className="w-full mt-5 py-3 md:text-4xl sm:text-2xl text-xl text-center text-[#2AA7FF] font-medium underline">
        First Aid
      </h2>

      {/* disease details  */}
      <div
        className="prose prose-lg prose-indigo py-5 px-6 text-justify leading-6 space-y-4"
        dangerouslySetInnerHTML={{ __html: geminiResponse }}
      ></div>
    </>
  );
};

export default ShowFirstAid;
