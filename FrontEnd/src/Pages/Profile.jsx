import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)

    if (!user) {
        return <div className="text-white p-6">Loading profile...</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile</h1>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 max-w-3xl">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="h-24 w-24 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl font-bold border border-indigo-500/30">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                        <p className="text-slate-400">{user.email}</p>
                        <div className="mt-2 flex gap-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 capitalize">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Full Name</label>
                        <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300">
                            {user.name}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Email Address</label>
                        <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300">
                            {user.email}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Mobile Number</label>
                        <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300">
                            {user.mobile || 'Not provided'}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Account ID</label>
                        <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm">
                            {user._id}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile