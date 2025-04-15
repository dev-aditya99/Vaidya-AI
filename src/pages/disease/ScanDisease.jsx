import React, { useState } from "react";
import Container from "../../components/other/Container";
import { LuImagePlus } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import CommonDialogBox from "../../components/other/CommonDialogBox";
import CommonButton from "../../components/buttons/CommonButton";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CommonLoader2 from "../../components/loaders/CommonLoader2";
import toast from "react-hot-toast";

const ScanDisease = () => {
  // navigate
  const navigate = useNavigate();

  // context
  const { setGeminiResponse, geoLocation } = useAuthContext();

  // states
  const [isLoader, setIsLoader] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [imageHolder, setImageHolder] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");

  //   functions
  const fileChangeHandler = (e) => {
    setIsImage(true);
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageHolder(file);
    }
  };

  // submit hadler
  const submitHandler = () => {
    try {
      const formData = new FormData();
      formData.append("image", imageHolder);
      formData.append("description", description);
      formData.append("geoLocation", JSON.stringify(geoLocation));

      const toastLoading = toast.loading("Scanning Image....");
      setIsLoader(true);
      axios
        .post("http://localhost:5000/disease/scan-disease", formData)
        .then((success) => {
          setGeminiResponse(success.data.response);
          localStorage.setItem(
            "diease-details",
            JSON.stringify(success.data.response)
          );
          toast.success("Scanning Completed");
          navigate("/show-disease-details");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        })
        .finally(() => {
          toast.dismiss(toastLoading);
          setIsLoader(false);
          setIsImage(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-[80vh] py-5">
        <Container
          className={
            "h-full mx-auto px-5 flex items-center justify-center gap-2 flex-wrap"
          }
        >
          {/* upload image box  */}
          <label htmlFor="upload_disease">
            <div className="group sm:w-[300px] w-[200px] py-8 px-6 bg-[#FAFBFE] rounded-xl shadow-xl flex items-center justify-center flex-col gap-4 hover:bg-[#2AA7FF] hover:text-white select-none cursor-pointer duration-200">
              <LuImagePlus className="sm:text-5xl text-3xl text-[#2AA7FF] group-hover:text-white duration-200" />
              <span>Upload Image</span>
            </div>
          </label>

          {/* input for upload image  */}
          <input
            type="file"
            accept="image/*"
            id="upload_disease"
            hidden
            onChange={(e) => fileChangeHandler(e)}
          />

          {/* open camera box  */}
          <label htmlFor="capture_disease">
            <div className="group sm:w-[300px] w-[200px] py-8 px-6 bg-[#FAFBFE] rounded-xl shadow-xl flex items-center justify-center flex-col gap-4 hover:bg-[#2AA7FF] hover:text-white select-none cursor-pointer duration-200">
              <FaCamera className="sm:text-5xl text-3xl text-[#2AA7FF] group-hover:text-white duration-200" />
              <span>Upload Image</span>
            </div>
          </label>

          {/* input for camera  */}
          <input
            type="file"
            accept="image/*"
            id="capture_disease"
            capture="environment"
            hidden
            onChange={(e) => fileChangeHandler(e)}
          />

          {/* common dialogue box  */}
          {isImage && (
            <CommonDialogBox className={"bg-white"}>
              <div className="min-[550px]:w-[500px] min-[380px]:w-[300px] w-[220px] min-[550px]:h-[300px] h-[250px] mb-3 border border-gray-300">
                <img
                  src={preview}
                  alt="preview_disease"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* text area  */}
              <textarea
                name="disease_description"
                id="disease_description"
                className="w-full py-2 px-4 bg-gray-200 sm:text-[16px] text-[14px] outline-none rounded-sm resize-none"
                placeholder="Describe your disease...(optional)"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              {/* btns  */}
              <div className="w-full sm:text-[16px] text-[14px] flex items-center justify-end gap-2">
                {/* upload bn  */}
                <CommonButton
                  buttonTitle={
                    isLoader ? (
                      <CommonLoader2 className="w-6 h-6 border-white" />
                    ) : (
                      "Upload"
                    )
                  }
                  className={
                    "bg-[#2AA7FF] text-white font-medium px-4 py-2 hover:bg-[#0095fc]"
                  }
                  onClick={submitHandler}
                ></CommonButton>

                {/* cancel btn  */}
                <CommonButton
                  buttonTitle={"Cancel"}
                  className={"bg-gray-200 px-4 py-2 hover:bg-gray-300"}
                  onClick={() => setIsImage(false)}
                ></CommonButton>
              </div>
            </CommonDialogBox>
          )}
        </Container>
      </div>
    </>
  );
};

export default ScanDisease;
