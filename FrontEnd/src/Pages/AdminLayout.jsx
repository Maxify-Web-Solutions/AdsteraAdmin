import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Components/Header";

const AdminLayout = () => {

    return (
        <>
        <Header/>
        <div className="flex min-h-screen bg-slate-900 text-white">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">

                <h2 className="text-xl font-bold mb-8 text-indigo-400">
                    Admin Panel
                </h2>

                <nav className="flex flex-col gap-3">

                    <Link to="/dashboard" className="px-4 py-2 rounded hover:bg-slate-700">
                        Dashboard
                    </Link>

                    <Link to="/dashboard/users" className="px-4 py-2 rounded hover:bg-slate-700">
                        Users
                    </Link>

                    <Link to="/dashboard/packages" className="px-4 py-2 rounded hover:bg-slate-700">
                        Packages
                    </Link>

                    <Link to="/dashboard/scraping" className="px-4 py-2 rounded hover:bg-slate-700">
                        Scraping Data
                    </Link>

                </nav>

            </aside>

            {/* Right Content */}
            <main className="flex-1 p-10">

                <Outlet />

            </main>

        </div>
        </>
    );
};

export default AdminLayout;