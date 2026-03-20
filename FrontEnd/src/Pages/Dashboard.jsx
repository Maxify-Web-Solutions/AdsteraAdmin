import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slice/adminSlice";
import { getPendingLinks, getApprovedLinks, getRejectedLinks } from "../redux/slice/smartlinkSlice";
import SmartlinksChart from "../Components/SmartlinksChart";
import QuickActions from "../Components/QuickActions";
import { FaUser } from "react-icons/fa";

const Dashboard = () => {

  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector((state) => state.admin);
  const { pending, approved, rejected, loading: linksLoading } = useSelector((state) => state.smartLink);

      const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPendingLinks());
    dispatch(getApprovedLinks());
    dispatch(getRejectedLinks());
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
          Welcome back 👋 {user?.name}
        </span>

      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Users */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-gray-400 text-sm">
            Total Users
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            {usersLoading ? "..." : users.length}
          </p>

        </div>

        {/* Approved */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">
            Approved Links
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            {linksLoading ? "..." : approved.length}
          </p>

        </div>

        {/* Pending */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Pending Links
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            {linksLoading ? "..." : pending.length}
          </p>

        </div>

        {/* Rejected */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-700 transition">

          <h2 className="text-rose-400 text-sm font-semibold uppercase tracking-wider">
            Rejected Links
          </h2>

          <p className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            {linksLoading ? "..." : rejected.length}
          </p>

        </div>

      </div>

      {/* Charts Section */}
      <div className="w-full">
        <SmartlinksChart 
          pending={pending} 
          approved={approved} 
          rejected={rejected} 
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex flex-col">

          <h2 className="text-lg sm:text-xl font-semibold mb-6 text-white">
            Recent Users
          </h2>

          {recentUsers.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
              <p>No users yet</p>
            </div>

          ) : (

            <div className="flex flex-col gap-3">

              {recentUsers.map((user) => (

                <div
                  key={user._id}
                  className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 border border-transparent hover:border-slate-600 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-indigo-400 font-bold text-sm border border-slate-600 shadow-sm group-hover:scale-105 transition-transform">
                    {user.name ? user.name.charAt(0).toUpperCase() : <FaUser size={14} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide border ${
                       user.role === 'admin' 
                       ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                       : 'bg-slate-600/30 text-slate-400 border-slate-600'
                     }`}>
                       {user.role || 'User'}
                     </span>
                  </div>
                </div>

              ))}

            </div>

          )}

        </div>

        {/* Quick Actions */}
        <QuickActions />

      </div>

    </div>
  );
};

export default Dashboard;