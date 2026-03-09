import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
    }));

    if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
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
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                    >
                        Login
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