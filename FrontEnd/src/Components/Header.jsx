import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import { logoutUser } from "../redux/slice/authSlice";

const Header = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    
    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <header className="w-full h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white">
                    A
                </div>

                <h1 className="text-lg font-semibold text-white">
                    Admin Dashboard
                </h1>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">

                {/* Notifications */}
                <button className="text-gray-400 hover:text-white text-xl">
                    <FiBell />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">

                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3"
                    >

                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-sm text-gray-300 hidden md:block">
                            {user?.name || "Admin"}
                        </span>

                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-3 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">

                            <button
                                onClick={() => navigate("/profile")}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-slate-700"
                            >
                                <FiUser />
                                Profile
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-slate-700"
                            >
                                <FiLogOut />
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
};

export default Header;