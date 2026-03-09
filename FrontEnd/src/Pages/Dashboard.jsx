import React from "react";
import Header from "../Components/Header";

const Dashboard = () => {
  return (
    <>
    
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-gray-400">Total Users</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-gray-400">Active Packages</h2>
          <p className="text-3xl font-bold mt-2">35</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-gray-400">Total Scrapes</h2>
          <p className="text-3xl font-bold mt-2">540</p>
        </div>

      </div>

    </div>
    </>
  );
};

export default Dashboard;