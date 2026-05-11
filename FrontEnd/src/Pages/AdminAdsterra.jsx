// pages/AdminAdsterra.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getConfig,
  updateConfig,
  clearConfigState,
} from "../redux/slice/configSlice";

const AdminAdsterra = () => {
  const dispatch =
    useDispatch();

  const {
    config,
    loading,
    updateLoading,
    success,
    error,
    message,
  } = useSelector(
    (state) => state.config
  );

  // =========================
  // STATES
  // =========================

  const [key, setKey] =
    useState("");

  const [cpmPercent,
    setCpmPercent] =
    useState("");

  const [
    revenuePercent,
    setRevenuePercent,
  ] = useState("");

  // =========================
  // GET CONFIG
  // =========================

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  // =========================
  // SET DATA
  // =========================

  useEffect(() => {
    if (config) {
      setKey(
        config.adsterraApiKey ||
          ""
      );

      setCpmPercent(
        config.cpmPercent || ""
      );

      setRevenuePercent(
        config.revenuePercent ||
          ""
      );
    }
  }, [config]);

  // =========================
  // CLEAR MESSAGE
  // =========================

  useEffect(() => {
    if (success || error) {
      const timer =
        setTimeout(() => {
          dispatch(
            clearConfigState()
          );
        }, 3000);

      return () =>
        clearTimeout(timer);
    }
  }, [
    success,
    error,
    dispatch,
  ]);

  // =========================
  // UPDATE API KEY
  // =========================

  const handleApiKeyUpdate =
    () => {
      dispatch(
        updateConfig({
          adsterraApiKey:
            key,
        })
      );
    };

  // =========================
  // UPDATE CPM
  // =========================

  const handleCpmUpdate =
    () => {
      dispatch(
        updateConfig({
          cpmPercent,
        })
      );
    };

  // =========================
  // UPDATE REVENUE
  // =========================

  const handleRevenueUpdate =
    () => {
      dispatch(
        updateConfig({
          revenuePercent,
        })
      );
    };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-xl p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Adsterra Config
        </h1>

        {/* ================= API KEY ================= */}

        <div className="mb-8">
          <label className="block text-sm text-gray-300 mb-2">
            Adsterra API
            Key
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={key}
              onChange={(e) =>
                setKey(
                  e.target.value
                )
              }
              placeholder="Enter API Key"
              className="flex-1 p-3 rounded-xl bg-gray-700 outline-none"
            />

            <button
              type="button"
              onClick={
                handleApiKeyUpdate
              }
              disabled={
                updateLoading
              }
              className="bg-blue-600 hover:bg-blue-700 px-5 rounded-xl font-medium"
            >
              Save
            </button>
          </div>
        </div>

        {/* ================= CPM ================= */}

        <div className="mb-8">
          <label className="block text-sm text-gray-300 mb-2">
            CPM Percent
          </label>

          <div className="flex gap-3">
            <input
              type="number"
              value={
                cpmPercent
              }
              onChange={(e) =>
                setCpmPercent(
                  e.target.value
                )
              }
              placeholder="Enter CPM %"
              className="flex-1 p-3 rounded-xl bg-gray-700 outline-none"
            />

            <button
              type="button"
              onClick={
                handleCpmUpdate
              }
              disabled={
                updateLoading
              }
              className="bg-green-600 hover:bg-green-700 px-5 rounded-xl font-medium"
            >
              Save
            </button>
          </div>
        </div>

        {/* ================= REVENUE ================= */}

        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">
            Revenue Percent
          </label>

          <div className="flex gap-3">
            <input
              type="number"
              value={
                revenuePercent
              }
              onChange={(e) =>
                setRevenuePercent(
                  e.target.value
                )
              }
              placeholder="Enter Revenue %"
              className="flex-1 p-3 rounded-xl bg-gray-700 outline-none"
            />

            <button
              type="button"
              onClick={
                handleRevenueUpdate
              }
              disabled={
                updateLoading
              }
              className="bg-purple-600 hover:bg-purple-700 px-5 rounded-xl font-medium"
            >
              Save
            </button>
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {(loading ||
          updateLoading) && (
          <p className="text-center text-blue-400 mt-4">
            Processing...
          </p>
        )}

        {/* ================= SUCCESS ================= */}

        {success && (
          <p className="text-center text-green-400 mt-4">
            {message ||
              "Updated successfully ✅"}
          </p>
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <p className="text-center text-red-400 mt-4">
            {typeof error ===
            "string"
              ? error
              : error?.message}
          </p>
        )}

        {/* ================= PREVIEW ================= */}

        {config && (
          <div className="mt-8 border-t border-gray-700 pt-5 text-sm text-gray-400 space-y-2">

            <p>
              <span className="text-white">
                API Key:
              </span>{" "}
              {config.adsterraApiKey ||
                "Not Set"}
            </p>

            <p>
              <span className="text-white">
                CPM:
              </span>{" "}
              {config.cpmPercent ||
                0}
              %
            </p>

            <p>
              <span className="text-white">
                Revenue:
              </span>{" "}
              {config.revenuePercent ||
                0}
              %
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAdsterra;