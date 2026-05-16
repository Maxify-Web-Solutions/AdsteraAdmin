import React, {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    getStatsConfig,
    saveStatsConfig,
    clearStatsConfigState,
} from "../redux/slice/statsConfigSlice";

const StatsConfigPage = () => {
    const dispatch = useDispatch();

    // ====================================
    // REDUX STATE
    // ====================================

    const {
        loading,
        config,
        error,
        success,
        message,
    } = useSelector(
        (state) => state.statsConfig
    );

    // ====================================
    // LOCAL STATE
    // ====================================

    const [formData, setFormData] =
        useState({
            impressionPercent: "",
            cpmPercent: "",
        });

    // ====================================
    // FETCH CONFIG
    // ====================================

    useEffect(() => {
        dispatch(getStatsConfig());
    }, [dispatch]);

    // ====================================
    // SET FORM DATA
    // ====================================

    useEffect(() => {
        if (config) {
            setFormData({
                impressionPercent:
                    config.impressionPercent ||
                    "",

                cpmPercent:
                    config.cpmPercent ||
                    "",
            });
        }
    }, [config]);

    // ====================================
    // CLEAR SUCCESS
    // ====================================

    useEffect(() => {
        if (success) {
            const timer =
                setTimeout(() => {
                    dispatch(
                        clearStatsConfigState()
                    );
                }, 3000);

            return () =>
                clearTimeout(timer);
        }
    }, [success, dispatch]);

    // ====================================
    // HANDLE CHANGE
    // ====================================

    const handleChange = (e) => {
        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    // ====================================
    // HANDLE SUBMIT
    // ====================================

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            saveStatsConfig({
                impressionPercent:
                    Number(
                        formData.impressionPercent
                    ),

                cpmPercent:
                    Number(
                        formData.cpmPercent
                    ),
            })
        );
    };

    // ====================================
    // RESET
    // ====================================

    const handleReset = () => {
        setFormData({
            impressionPercent:
                config?.impressionPercent ||
                "",

            cpmPercent:
                config?.cpmPercent ||
                "",
        });
    };

    return (
        <div className="min-h-screen bg-[#111827] p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* ==================================== */}
                {/* HEADER */}
                {/* ==================================== */}

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Stats Configuration
                    </h1>

                    <p className="text-gray-400 mt-2 text-sm md:text-base">
                        Manage global impression
                        and CPM percentages.
                    </p>
                </div>

                {/* ==================================== */}
                {/* MAIN CARD */}
                {/* ==================================== */}

                <div className="bg-[#1F2937] rounded-[28px] border border-gray-700 shadow-2xl overflow-hidden">

                    {/* TOP BAR */}

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
                        <h2 className="text-white text-xl font-semibold">
                            Update Configuration
                        </h2>
                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="p-6 md:p-8 space-y-6"
                    >

                        {/* SUCCESS */}

                        {success && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                                <p className="text-green-400 text-sm">
                                    {message ||
                                        "Configuration updated successfully"}
                                </p>
                            </div>
                        )}

                        {/* ERROR */}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
                                <p className="text-red-400 text-sm">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* IMPRESSION */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-3">
                                Impression Percent
                            </label>

                            <div className="relative">
                                <input
                                    type="number"
                                    name="impressionPercent"
                                    value={
                                        formData.impressionPercent
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter impression percent"
                                    className="w-full h-14 rounded-2xl border border-gray-700 bg-[#111827] px-5 pr-14 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                />

                                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                                    %
                                </span>
                            </div>
                        </div>

                        {/* CPM */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-3">
                                CPM Percent
                            </label>

                            <div className="relative">
                                <input
                                    type="number"
                                    name="cpmPercent"
                                    value={
                                        formData.cpmPercent
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter CPM percent"
                                    className="w-full h-14 rounded-2xl border border-gray-700 bg-[#111827] px-5 pr-14 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />

                                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                                    %
                                </span>
                            </div>
                        </div>

                        {/* INFO */}

                        <div className="bg-[#111827] border border-blue-900 rounded-2xl p-4">
                            <p className="text-blue-300 text-sm leading-relaxed">
                                These percentages
                                will be applied
                                globally to all
                                stats calculations
                                inside the system.
                            </p>
                        </div>

                        {/* BUTTONS */}

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 disabled:opacity-60 text-white font-semibold shadow-lg transition-all duration-300"
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Configuration"}
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleReset
                                }
                                disabled={loading}
                                className="flex-1 h-14 rounded-2xl bg-[#111827] hover:bg-[#0f172a] border border-gray-700 text-gray-200 font-semibold transition-all duration-300"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* ==================================== */}
                {/* PREVIEW CARDS */}
                {/* ==================================== */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                    {/* IMPRESSION */}

                    <div className="bg-[#1F2937] rounded-3xl border border-gray-700 shadow-2xl p-6">
                        <p className="text-sm text-gray-400 mb-3">
                            Current Impression Percent
                        </p>

                        <h2 className="text-4xl font-bold text-blue-500">
                            {config?.impressionPercent ||
                                0}
                            %
                        </h2>
                    </div>

                    {/* CPM */}

                    <div className="bg-[#1F2937] rounded-3xl border border-gray-700 shadow-2xl p-6">
                        <p className="text-sm text-gray-400 mb-3">
                            Current CPM Percent
                        </p>

                        <h2 className="text-4xl font-bold text-indigo-500">
                            {config?.cpmPercent ||
                                0}
                            %
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsConfigPage;