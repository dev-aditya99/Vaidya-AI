import React, { useRef, useState } from "react";
import CommonButton from "../../components/buttons/CommonButton";
import Container from "../../components/other/Container";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import CommonLoader2 from "../../components/loaders/CommonLoader2";
import axios from "axios";

const FindFirstAid = () => {
  // navigate
  const navigate = useNavigate();

  // context
  const { setGeminiResponse, geoLocation, backendBaseURL } = useAuthContext();

  // states
  const [isLoader, setIsLoader] = useState(false);

  //   ref
  const textareaRef = useRef(null);

  //   function
  const submitHandler = () => {
    try {
      let diseaseData = textareaRef.current.value;
      const formData = new FormData();
      formData.append("diseaseData", diseaseData);
      formData.append("geoLocation", JSON.stringify(geoLocation));

      const toastLoading = toast.loading("Analyzing....");
      setIsLoader(true);

      axios
        .post(backendBaseURL + "/disease/first-aid", formData)
        .then((success) => {
          setGeminiResponse(success.data.response);
          localStorage.setItem(
            "diease-details",
            JSON.stringify(success.data.response)
          );

          toast.success("Analysis Completed");
          navigate("/show-first-aid");
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
          "h-full mx-auto px-5 flex items-center justify-center gap-2 flex-wrap flex-col"
        }
      >
        {/* disease data writing area  */}
        <textarea
          ref={textareaRef}
          name="disease_data_textarea"
          id="disease_data_textarea"
          placeholder="Write your symptoms or disease here..."
          className="sm:w-[500px] w-full h-[200px] px-2 py-3 bg-white border border-gray-300 outline-none rounded-md resize-none focus:shadow-2xl focus:border-transparent duration-200"
          autoFocus
        ></textarea>

        {/* button area  */}
        <div className="sm:w-[500px] w-full py-2 px-2 flex items-center justify-end gap-2">
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

export default FindFirstAid;
