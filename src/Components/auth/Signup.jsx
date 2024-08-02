import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Buttons from "../../utils/Buttons";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const toast = useToast();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // Access the token and setToken function using the useMyContext hook from the ContextProvider

  const navigate = useNavigate();

  //react hook form initialization
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data) => {
    const { name, email, password } = data;
    const sendData = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_PATH + `/api/user/signup`,
        sendData
      );

      dispatch({ type: "SIGN_UP", payload: data });
      localStorage.setItem("userData", JSON.stringify(data));
      toast({
        title: "Success",
        description: "Now you can apply and create new job",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      reset();
      navigate("/");
    } catch (error) {
      toast({
        title: "Warning",
        description: error?.response?.data?.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-6 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Register Here Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to create new account
          </p>
          <div className="flex items-center justify-between gap-1 py-5 ">
            <a
              href={``}
              className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
            >
              <span>
                <FcGoogle className="text-2xl" />
              </span>
              <span className="font-semibold sm:text-customText text-xs">
                Login with Google
              </span>
            </a>
            <a
              href={``}
              className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
            >
              <span>
                <FaGithub className="text-2xl" />
              </span>
              <span className="font-semibold sm:text-customText text-xs">
                Login with Github
              </span>
            </a>
          </div>

          {/* <Divider className="font-semibold">OR</Divider> */}
        </div>

        <div className="flex flex-col gap-2">
          <InputField
            label="UserName"
            required
            id="name"
            type="text"
            message="*UserName is required"
            placeholder="type your username"
            register={register}
            errors={errors}
          />{" "}
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="type your email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="type your password"
            register={register}
            errors={errors}
            min={6}
          />
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="bg-rose-600 font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Register"}
        </Buttons>

        <p className="text-center text-sm text-slate-700 mt-2">
          Already have an account?{" "}
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
