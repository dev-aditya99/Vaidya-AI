import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import Container from "../../components/other/Container";
import PasswordToggleButton from "../../components/buttons/PasswordToggleButton";
import useLogin from "../../Hooks/useLogin";
import toast from "react-hot-toast";
import CommonLoader2 from "../../components/loaders/CommonLoader2";

const Login = () => {
  // hooks
  const { loginUser, loading } = useLogin();

  // functions
  // submit handler for user login
  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      await loginUser({
        email: e.target.email.value,
        password: e.target.password.value,
      });
    } catch (error) {
      toast.error("Error During Login Submit : " + error.message);
      console.error(error);
    }
  };
  return (
    <Container>
      <div className="w-full h-screen flex items-center justify-center">
        {/* login form  */}
        <form
          onSubmit={submitHandler}
          className="w-96 text-white sm:p-8 p-4 rounded-3xl sm:shadow-none shadow-sm border border-gray-800"
        >
          {/* heading of page  */}
          <h2 className="text-3xl font-bold mb-6">Log In</h2>
          {/* email  */}
          <div className="sm:mb-6 mb-2">
            <label htmlFor="email" className="block mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              name="password"
              className="w-full p-2 border rounded bg-[#ffffff20] text-white"
            />

            {/* toggle password visibility  */}
            <PasswordToggleButton
              targetId="password"
              className="text-xl top-[55%]"
            />
          </div>

          {/* submit btn  */}
          <button
            type="submit"
            className="w-full py-2 bg-themeColor hover:bg-themeColorLight text-white flex items-center justify-center gap-2 rounded mb-4 duration-200"
          >
            Log In
            {loading && <CommonLoader2 className="w-6 h-6" />}
          </button>

          {/* more options to login  */}
          <p className="text-center text-sm">Or log in with</p>
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

          {/* sign up suggestion  */}
          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-themeColor">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
};

export default Login;
