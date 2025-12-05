import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useUser from "../hooks/useUser";

const AuthLayout = () => {
  const { isLoading, isError } = useUser();
  const navigate = useNavigate();

  // Handle redirect on auth failure
  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/login");
    }
  }, [isLoading, isError, navigate]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page content grows to fill space */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
