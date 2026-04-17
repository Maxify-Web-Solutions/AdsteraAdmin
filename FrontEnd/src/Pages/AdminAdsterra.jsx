// pages/AdminAdsterra.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdsterraKey,
  getAdsterraKey,
} from "../redux/slice/configSlice";

const AdminAdsterra = () => {
  const dispatch = useDispatch();

  const { loading, success, apiKey } = useSelector(
    (state) => state.config
  );

  const [key, setKey] = useState("");

  // ✅ GET existing key on load
  useEffect(() => {
    dispatch(getAdsterraKey());
  }, [dispatch]);

  // ✅ set input value when apiKey comes
  useEffect(() => {
    if (apiKey) {
      setKey(apiKey);
    }
  }, [apiKey]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateAdsterraKey({ adsterraApiKey: key }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-[400px] shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Adsterra API Key
        </h2>

        <input
          type="text"
          placeholder="Enter API Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 mb-4 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Key"}
        </button>

        {/* ✅ Success Message */}
        {success && (
          <p className="text-green-400 mt-4 text-center">
            Key updated successfully ✅
          </p>
        )}

        {/* ✅ Current Key Preview */}
        <p className="text-xs text-gray-400 mt-4 break-all text-center">
          Current: {apiKey || "Not set"}
        </p>
      </form>
    </div>
  );
};

export default AdminAdsterra;