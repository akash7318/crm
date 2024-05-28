import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const PrivateComponent = () => {
    const auth = localStorage.getItem("user");
    return auth
        ?
        <section className="w-full h-screen pt-16 relative">
            <Toaster position="bottom-right" />
            <Nav />
            <div className="w-full flex bg-[#DADCFD] h-full">
                <div className="w-1/5 h-full bg-[#333564] overflow-x-auto">
                    <Sidebar />
                </div>
                <div className="p-4 w-full overflow-x-auto">
                    <Outlet />
                </div>
            </div>
        </section>
        :
        <Navigate to="/" />;
}

export default PrivateComponent;