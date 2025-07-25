import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <div className="container mt-20">

                    <Outlet />
                </div>
            </div>
            <Footer />
        </>

    );
}

export default Layout;