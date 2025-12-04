import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router";
import { useNotification } from "../hooks/useNotification";
import type { AxiosError } from "axios";
const Login = () => {
  const [username,setUsername] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const navigate = useNavigate()
  const {isLoading,isError: userError} = useUser()
  const {mutate: login,isError, isSuccess,error, isPending} = useLogin()
  const {add} = useNotification()
  const handleSubmit = async(e: any) => {
      e.preventDefault();
      login({username, password });

  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/drive/root");
    }
  }, [isSuccess, navigate]);
  useEffect(() => {
    if (isError && !isPending) {
      add((error as AxiosError<{msg: string}>).response?.data?.msg || "Something went wrong");
    }
  }, [isError, isPending, error, add]);
  useEffect(() => {
  if (isSuccess) return;
  if (!isLoading && !userError) {
    navigate("/drive/root");
  }
}, [isLoading, userError, isSuccess, navigate]);
  if(isLoading || !userError){
    return
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-6">
          Welcome Back
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
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-gray-600 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
