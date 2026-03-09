import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slice/adminSlice";

const Dashboard = () => {

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const recentUsers = users.slice(0, 5);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

        <span className="text-sm text-gray-400">
          Welcome back 👋
        </span>

      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Users */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-gray-400 text-sm">
            Total Users
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            {loading ? "..." : users.length}
          </p>

        </div>

        {/* Packages */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-gray-400 text-sm">
            Active Packages
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            0
          </p>

        </div>

        {/* Scrapes */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-gray-400 text-sm">
            Total Scrapes
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            0
          </p>

        </div>

      </div>


      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">

          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Recent Users
          </h2>

          {recentUsers.length === 0 ? (

            <p className="text-gray-400">
              No users yet
            </p>

          ) : (

            <div className="space-y-3">

              {recentUsers.map((user) => (

                <div
                  key={user._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-slate-700 px-4 py-3 rounded-lg"
                >

                  <div>

                    <p className="font-semibold text-white">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {user.email}
                    </p>

                  </div>

                  <span className="text-xs text-gray-400">
                    {user.mobile}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* System Info */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">

          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            System Overview
          </h2>

          <div className="space-y-4 text-gray-300 text-sm">

            <div className="flex justify-between">
              <span>Server Status</span>
              <span className="text-green-400">
                ● Online
              </span>
            </div>

            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-400">
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span>Scraping Engine</span>
              <span className="text-yellow-400">
                Idle
              </span>
            </div>

            <div className="flex justify-between">
              <span>System Version</span>
              <span>
                v1.0.0
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;