import React from "react";
import Container from "../../components/other/Container";
import useSignUp from "../../Hooks/useSignUp";
import PasswordToggleButton from "../../components/buttons/PasswordToggleButton";
import CommonLoader2 from "../../components/loaders/CommonLoader2";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  // custom hooks
  const { signup, loading } = useSignUp();

  // functions
  // sign up form submit handler
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await signup({
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirm_password: e.target.confirm_password.value,
        role: "user",
      });
    } catch (error) {
      toast.error("Error During Signup Submit : " + error.message);
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="w-full min-h-screen py-4 flex items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="md:w-[600px] sm:w-[80%] w-full text-white sm:p-8 p-4 flex flex-col rounded-3xl sm:shadow-none shadow-sm border border-gray-800"
        >
          {/* sign up heading  */}
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          {/* names  */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* first name */}
            <div className="sm:mb-6 mb-2 grow">
              <label htmlFor="first_name" className="block mb-2 text-sm">
                First Name
              </label>
              <input
                type="name"
                id="first_name"
                name="first_name"
                className="w-full p-2 border rounded bg-[#ffffff20] text-white"
              />
            </div>

            {/* last name */}
            <div className="sm:mb-6 mb-2 grow">
              <label htmlFor="last_name" className="block mb-2 text-sm">
                Last Name
              </label>
              <input
                type="name"
                name="last_name"
                id="last_name"
                className="w-full p-2 border rounded bg-[#ffffff20] text-white"
              />
            </div>
          </div>

          {/* email  */}
          <div className="sm:mb-6 mb-2">
            <label htmlFor="email" className="block mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded bg-[#ffffff20] text-white"
            />
          </div>

          {/* password  */}
          <div className="sm:mb-6 mb-2 relative">
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded bg-[#ffffff20] text-white"
            />

            {/* toggle password visibility  */}
            <PasswordToggleButton
              targetId="password"
              className="text-xl top-[55%]"
            />
          </div>

          {/*confirm password  */}
          <div className="sm:mb-6 mb-2 relative">
            <label htmlFor="confirm_password" className="block mb-2 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="w-full p-2 border rounded bg-[#ffffff20] text-white"
            />

            {/* toggle password visibility  */}
            <PasswordToggleButton
              targetId="confirm_password"
              className="text-xl top-[55%]"
            />
          </div>

          {/* submit btn  */}
          <button
            type="submit"
            className="w-full py-2 bg-themeColor hover:bg-themeColorLight text-white text-base font-medium flex items-center justify-center gap-2 rounded mb-4 duration-200"
          >
            Sign Up
            {loading && <CommonLoader2 className="w-6 h-6" />}
          </button>

          {/* more options to sign up  */}
          <p className="text-center text-sm">Or sign up with</p>
          {/* option details  */}
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-2 bg-red-500 rounded-full">
              <FaGoogle className="text-white" />
            </button>
            <button className="p-2 bg-blue-600 rounded-full">
              <FaFacebook className="text-white" />
            </button>
            <button className="p-2 bg-gray-700 rounded-full">
              <FaGithub className="text-white" />
            </button>
          </div>

          {/* login suggestion */}
          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-themeColor">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
