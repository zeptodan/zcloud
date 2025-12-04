import Footer from "../components/Footer";
import { Link, redirect } from "react-router";
import useUser from "../hooks/useUser";

const Home = () => {
    const { isLoading,isError} = useUser()
    if (!isLoading && !isError){
        redirect("/drive")
    }
  return (
    <div className="w-screen h-screen flex flex-col">
      <main className="flex flex-col flex-1 items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4 tracking-tight">
          Zcloud
        </h1>

        <p className="text-xl text-gray-600 max-w-xl mb-10">
          Simple and fast cloud storage for your files.  
          Upload, manage, and organize folders with ease.
        </p>

        <div className="flex gap-6">
          <Link
            to="/login"
            className="py-3 px-8 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="py-3 px-8 rounded-2xl bg-gray-600 text-white hover:bg-gray-700 transition font-medium shadow-sm"
          >
            Signup
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
