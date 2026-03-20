import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiCheckSquare, FiLink2 } from 'react-icons/fi';

const QuickActions = () => {
    const actions = [
        {
            title: 'Manage Users',
            description: 'View, add, or edit user accounts.',
            icon: <FiUsers className="text-blue-400" size={22} />,
            path: '/dashboard/users',
            color: 'border-blue-500/30 hover:border-blue-500/60',
        },
        {
            title: 'Review Pending Links',
            description: 'Approve or reject new smartlinks.',
            icon: <FiCheckSquare className="text-amber-400" size={22} />,
            path: '/dashboard/pending_Smartlinks',
            color: 'border-amber-500/30 hover:border-amber-500/60',
        },
        {
            title: 'View All Smartlinks',
            description: 'Get a complete overview of all links.',
            icon: <FiLink2 className="text-indigo-400" size={22} />,
            path: '/dashboard/all_Smartlinks',
            color: 'border-indigo-500/30 hover:border-indigo-500/60',
        },
    ];

    return (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                Quick Actions
            </h2>
            <div className="space-y-3">
                {actions.map((action) => (
                    <Link key={action.title} to={action.path} className={`flex items-center gap-4 p-4 rounded-lg bg-slate-700/40 border ${action.color} transition-all duration-200 hover:bg-slate-700/70 transform hover:scale-[1.02]`}>
                        <div className="flex-shrink-0 bg-slate-800 p-3 rounded-full">{action.icon}</div>
                        <div>
                            <p className="font-semibold text-white">{action.title}</p>
                            <p className="text-sm text-slate-400">{action.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;