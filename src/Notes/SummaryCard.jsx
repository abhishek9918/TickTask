import React from "react";

function SummaryCard({ title, count, iconPath, iconColor }) {
  return (
    <div className="bg-[#0d0d0d] rounded-xl p-2.5 shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-gray-800 transition transform hover:scale-105 hover:shadow-xl duration-300">
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-semibold">{count}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
