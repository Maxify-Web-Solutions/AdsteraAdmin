import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaShieldAlt, FaEdit, FaTimes } from 'react-icons/fa'
import Swal from 'sweetalert2'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        mobile: ''
    })

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    // Format date if available
    const joinDate = user.createdAt 
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'N/A';

    const handleEdit = () => {
        setFormData({
            name: user.name || '',
            mobile: user.mobile || ''
        })
        setIsEditing(true)
    }

    const handleSave = (e) => {
        e.preventDefault()
        // In a real application, you would dispatch an update action here
        // dispatch(updateProfile(formData));
        
        setIsEditing(false)
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile details have been updated successfully.',
            background: '#1e293b',
            color: '#fff',
            confirmButtonColor: '#6366f1'
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">My Profile</h1>

            {/* Main Profile Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                
                {/* Banner / Cover */}
                <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                     <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="px-8 pb-8">
                    {/* Header Section with Avatar */}
                    <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-12 mb-8 gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-900 p-1.5 shadow-2xl">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 text-4xl font-bold border border-slate-700">
                                {user.name?.charAt(0).toUpperCase() || <FaUser />}
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left mb-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h2>
                            <p className="text-slate-400 font-medium">{user.email}</p>
                        </div>

                        <div className="flex gap-3 items-center">
                             <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border ${
                                user.role === 'admin' 
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                : 'bg-slate-700 text-slate-400 border-slate-600'
                            }`}>
                                {user.role || 'User'}
                            </span>
                            <button 
                                onClick={handleEdit}
                                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-lg hover:shadow-indigo-500/30 border border-indigo-500"
                                title="Edit Profile"
                            >
                                <FaEdit />
                            </button>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">Personal Information</h3>
                            
                            <InfoItem icon={<FaUser />} label="Full Name" value={user.name} />
                            <InfoItem icon={<FaEnvelope />} label="Email Address" value={user.email} />
                            <InfoItem icon={<FaPhone />} label="Mobile Number" value={user.mobile || 'Not provided'} />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">Account Details</h3>

                            <InfoItem icon={<FaIdCard />} label="User ID" value={user._id} isMono />
                            <InfoItem icon={<FaCalendarAlt />} label="Joined" value={joinDate} />
                            <InfoItem icon={<FaShieldAlt />} label="Account Status" value="Active" color="text-emerald-400" />
                        </div>

                    </div>
                </div>
            </div>
            
             <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center text-sm text-slate-500">
                Secure Dashboard • Last login: {new Date().toLocaleDateString()}
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
                        <div className="flex justify-between items-center p-5 border-b border-slate-700 bg-slate-900/50">
                            <h3 className="text-lg font-bold text-white">Edit Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white transition">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                        <FaUser />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-slate-600"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Mobile Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                        <FaPhone />
                                    </div>
                                    <input 
                                        type="tel" 
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-slate-600"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition font-medium shadow-lg hover:shadow-indigo-500/25"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

const InfoItem = ({ icon, label, value, isMono = false, color = "text-slate-300" }) => (
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition duration-200">
        <div className="mt-1 text-slate-500 text-lg">{icon}</div>
        <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className={`font-medium ${isMono ? 'font-mono text-sm' : 'text-base'} ${color}`}>
                {value}
            </p>
        </div>
    </div>
)

export default Profile