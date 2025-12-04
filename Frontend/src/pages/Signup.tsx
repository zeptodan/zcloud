import { useState, useEffect } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router";
import { useNotification } from "../hooks/useNotification";
import type { AxiosError } from "axios";
const Signup = () => {
  const [username,setUsername] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const navigate = useNavigate()
  const {mutate: signup,isError, isSuccess,error, isPending} = useSignup()
  const {add} = useNotification()
  const handleSubmit = async(e: any) => {
      e.preventDefault();
      signup({username, password });

  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);
  useEffect(() => {
    if (isError && !isPending) {
      add((error as AxiosError<{msg: string}>).response?.data?.msg || "Something went wrong");
    }
  }, [isError, isPending, error, add]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Username</label>
            <input
              type="text"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
