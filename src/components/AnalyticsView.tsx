'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Zap, Flame, Award } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const hookLeaderboard = [
    { rank: 1, type: 'Transformation Story', retention: '97.2%', views: '54.2K', multiplier: '4.3x' },
    { rank: 2, type: 'Contrarian Take', retention: '96.4%', views: '48.1K', multiplier: '3.8x' },
    { rank: 3, type: 'Urgent Warning', retention: '95.1%', views: '32.6K', multiplier: '2.6x' },
    { rank: 4, type: 'Personal Story', retention: '91.8%', views: '28.4K', multiplier: '2.2x' },
    { rank: 5, type: '3-Step Framework', retention: '89.3%', views: '21.0K', multiplier: '1.7x' },
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[#1e2532] text-[#00e599] flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              10x Reach Multiplier Analytics
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00e599]/15 text-[#00e599] font-mono border border-[#00e599]/30">
              11.9x Multiplier Active
            </span>
          </div>
          <p className="text-xs text-[#78889b]">
            Track how your 10 video variations compound organic distribution compared to posting just once.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5">
          <p className="text-[11px] font-bold text-[#718296] uppercase mb-1 flex items-center justify-between">
            <span>Total Multiplied Views</span>
            <Eye className="w-4 h-4 text-[#00e599]" />
          </p>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-1">184,300</div>
          <p className="text-[10px] text-[#00e599] font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +1,090% vs single video
          </p>
        </div>

        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5">
          <p className="text-[11px] font-bold text-[#718296] uppercase mb-1 flex items-center justify-between">
            <span>Avg Hook Retention Rate</span>
            <Zap className="w-4 h-4 text-[#38bdf8]" />
          </p>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-1">93.4%</div>
          <p className="text-[10px] text-[#38bdf8] font-mono">Top 2% benchmark across TikTok & Reels</p>
        </div>

        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5">
          <p className="text-[11px] font-bold text-[#718296] uppercase mb-1 flex items-center justify-between">
            <span>Hours Saved This Month</span>
            <Flame className="w-4 h-4 text-[#f59e0b]" />
          </p>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-1">36.5 hrs</div>
          <p className="text-[10px] text-[#f59e0b] font-mono">Zero re-filming required</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#00e599]" />
          <span>Top Performing Hook Angles</span>
        </h3>

        <div className="space-y-2">
          {hookLeaderboard.map((item) => (
            <div
              key={item.rank}
              className="bg-[#0d1015] border border-[#1c222c] hover:border-[#27303e] rounded-lg p-3 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-[#18202c] text-white font-bold text-xs flex items-center justify-center">
                  #{item.rank}
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{item.type}</p>
                  <p className="text-[10px] text-[#718296]">Multiplier: {item.multiplier}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <p className="text-xs font-mono font-bold text-[#00e599]">{item.retention}</p>
                  <p className="text-[10px] text-[#556475]">Avg Retention</p>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white">{item.views}</p>
                  <p className="text-[10px] text-[#556475]">Views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
