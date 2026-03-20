import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Components/Header";

const AdminLayout = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Header />

            <div className="flex min-h-screen bg-slate-900 text-white">

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 p-2 rounded"
                >
                    ☰
                </button>


                {/* Sidebar */}
                <aside
                    className={`
            fixed lg:static z-40
            top-0 left-0 h-full w-64
            bg-slate-800 border-r border-slate-700 p-6
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
                >

                    {/* Close button (mobile only) */}
                    <div className="flex justify-between items-center mb-8 lg:hidden">

                        <h2 className="text-xl font-bold text-indigo-400">
                            Admin Panel
                        </h2>

                        <button onClick={() => setOpen(false)}>
                            ✕
                        </button>

                    </div>

                    <h2 className="text-xl font-bold mb-8 text-indigo-400 hidden  lg:block">
                        Admin Panel
                    </h2>

                    <nav className="flex flex-col gap-3 h-screen">

                        <Link
                            to="/dashboard"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded hover:bg-slate-700"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/dashboard/users"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded hover:bg-slate-700"
                        >
                            Users
                        </Link>
                        <Link
                            to="/dashboard/profile"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded hover:bg-slate-700"
                        >
                            Profile
                        </Link>
                    </nav>

                </aside>


                {/* Overlay (mobile) */}
                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/50 lg:hidden"
                    />
                )}


                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10">
                    <Outlet />
                </main>

            </div>
        </>
    );
};

export default AdminLayout;