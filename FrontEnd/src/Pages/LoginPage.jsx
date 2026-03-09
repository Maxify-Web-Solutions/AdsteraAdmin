import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";
import Swal from "sweetalert2";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
    }));

    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {

        const user = result.payload;

        // If not admin → logout and remove cookie
        if (user.role !== "admin") {

            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "Only admins can access this dashboard",
                background: "#1e293b",
                color: "#fff",
                confirmButtonColor: "#ef4444"
            });

            return;
        }

        await Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome to Admin Dashboard",
            showConfirmButton: false,
            timer: 1500,
            background: "#1e293b",
            color: "#fff"
        });

        navigate("/dashboard");

    } else {

        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: result.payload || "Invalid email or password",
            background: "#1e293b",
            color: "#fff",
            confirmButtonColor: "#6366f1"
        });

    }

};



    return (
        <>
        <Header/>

        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-lg">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Admin Login
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="admin@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-sm text-gray-400 text-center mt-6">
                    Secure Admin Access
                </p>

            </div>

        </div>
        </>
    );
};

export default LoginPage;