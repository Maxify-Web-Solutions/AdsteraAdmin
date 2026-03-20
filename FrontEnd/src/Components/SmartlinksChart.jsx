import React, { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const SmartlinksChart = ({ pending, approved, rejected }) => {
    const data = useMemo(() => {
        const allLinks = [...(pending || []), ...(approved || []), ...(rejected || [])];
        const dateMap = {};

        allLinks.forEach((link) => {
            if (!link.createdAt) return;
            // Group by date (YYYY-MM-DD)
            const date = new Date(link.createdAt).toISOString().split('T')[0];
            dateMap[date] = (dateMap[date] || 0) + 1;
        });

        // Convert to array and sort by date
        const sortedData = Object.keys(dateMap)
            .sort()
            .map((date) => ({
                date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                fullDate: date,
                count: dateMap[date],
            }));

        // Return last 14 active days
        return sortedData.slice(-14);
    }, [pending, approved, rejected]);

    if (data.length === 0) {
        return (
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center h-[350px]">
                <p className="text-slate-400 font-medium">No activity data available</p>
                <p className="text-slate-600 text-sm mt-1">Create smartlinks to see trends here.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-full shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Creation Trend</h2>
                <span className="text-xs font-medium px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Last 14 Active Days</span>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                            itemStyle={{ color: '#818cf8' }}
                            cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCount)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SmartlinksChart;