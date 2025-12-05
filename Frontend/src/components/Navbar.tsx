import { useNavigate } from "react-router";
import useLogout from "../hooks/useLogout";
import { useEffect } from "react";
import { useNotification } from "../hooks/useNotification";
import type { AxiosError } from "axios";

export default function Navbar() {
  const { mutate: logout,isPending,error,isError,isSuccess } = useLogout();
  const navigate = useNavigate();
  const {add}  = useNotification()
  const handleLogout = () => {
    logout();
  };
  useEffect(()=>{
    if(!isPending && isSuccess){
        navigate("/")
    }
  },[isPending,isSuccess,navigate])
  useEffect(()=>{
    if(!isPending && isError){
        add((error as AxiosError<{msg: string}>).response?.data?.msg || "Something went wrong");
    }
  },[isPending,isError,add])
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-semibold text-gray-800">
        MyDrive
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
      >
        Logout
      </button>
    </nav>
  );
}
