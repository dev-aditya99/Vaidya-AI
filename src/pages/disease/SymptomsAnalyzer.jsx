import React, { useRef, useState } from "react";
import Container from "../../components/other/Container";
import CommonButton from "../../components/buttons/CommonButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import CommonLoader2 from "../../components/loaders/CommonLoader2";
import toast from "react-hot-toast";

const SymptomsAnalyzer = () => {
  // navigate
  const navigate = useNavigate();

  // context
  const { setGeminiResponse, geoLocation } = useAuthContext();

  // states
  const [isLoader, setIsLoader] = useState(false);

  //   ref
  const textareaRef = useRef(null);

  //   function
  const submitHandler = () => {
    try {
      let symptomsData = textareaRef.current.value;
      const formData = new FormData();
      formData.append("symptomsData", symptomsData);
      formData.append("geoLocation", JSON.stringify(geoLocation));

      const toastLoading = toast.loading("Analyzing Symptoms....");
      setIsLoader(true);

      axios
        .post("http://localhost:5000/disease/symptoms-analyzer", formData)
        .then((success) => {
          setGeminiResponse(success.data.response);
          localStorage.setItem(
            "diease-details",
            JSON.stringify(success.data.response)
          );

          toast.success("Analysis Completed");
          navigate("/show-disease-details");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        })
        .finally(() => {
          toast.dismiss(toastLoading);
          setIsLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-5">
      <Container
        className={
          "h-full mx-auto px-5 flex items-center justify-center gap-2 flex-wrap"
        }
      >
        {/* symptoms writing area  */}
        <textarea
          ref={textareaRef}
          name="symptoms_textarea"
          id="symptoms_textarea"
          placeholder="Write your symptoms here..."
          className="md:w-[700px] w-full h-[300px] px-2 py-3 bg-white border border-gray-300 outline-none rounded-md resize-none focus:shadow-2xl focus:border-transparent duration-200"
          autoFocus
        ></textarea>

        {/* button area  */}
        <div className="w-[700px] py-2 px-2 flex items-center justify-end gap-2">
          <CommonButton
            buttonTitle={
              isLoader ? (
                <CommonLoader2 className="w-6 h-6 border-white" />
              ) : (
                "Find"
              )
            }
            className={
              "bg-[#2AA7FF] text-white font-medium px-4 py-2 hover:bg-[#0095fc] rounded-md"
            }
            onClick={submitHandler}
          ></CommonButton>

          {/* cancel btn  */}
          <CommonButton
            buttonTitle={"Cancel"}
            className={"bg-white px-4 py-2 shadow hover:bg-gray-100/75"}
            onClick={() => {
              history.back();
            }}
          ></CommonButton>
        </div>
      </Container>
    </div>
  );
};

export default SymptomsAnalyzer;
