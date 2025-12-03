import { Outlet, redirect } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useUser from "../hooks/useUser";
const Authlayout = () => {
    const { isLoading,isError} = useUser()
    if (isLoading){
        return
    }
    if(isError){
        redirect("/login")
    }
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default Authlayout