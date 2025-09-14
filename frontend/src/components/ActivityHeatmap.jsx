import React from 'react';

// In a real app, you would generate these days dynamically
const HeatmapDays = () => {
    const days = Array.from({ length: 28 });
    const activityLevels = ['bg-black/20', 'bg-[var(--primary-color)]/30', 'bg-[var(--primary-color)]/70', 'bg-[var(--primary-color)]'];

    return days.map((_, index) => (
        <div 
            key={index} 
            className={`calendar-day rounded-md ${activityLevels[Math.floor(Math.random() * activityLevels.length)]}`}
        ></div>
    ));
}

export default function ActivityHeatmap() {
    return (
        <div className="card p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold">Activity Heatmap</h3>
                    <p className="text-sm text-[var(--text-secondary-color)]">Last 28 Days</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">14 Day Streak</p>
                    <p className="text-sm text-[var(--text-secondary-color)]">Keep it up!</p>
                </div>
            </div>
            <div className="calendar-grid">
                <HeatmapDays />
            </div>
        </div>
    );
}