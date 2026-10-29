'use client';

import React from 'react';
import { Clock, Calendar, PlayCircle, CheckCircle2 } from 'lucide-react';

interface MetricsBarProps {
  queuedCount: number;
  scheduledCount: number;
  publishingCount: number;
  publishedCount: number;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  queuedCount,
  scheduledCount,
  publishingCount,
  publishedCount,
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Queued */}
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 flex flex-col justify-between hover:border-[#2b3342] transition-colors">
          <div className="flex items-center justify-between text-[#8a96a8] mb-2">
            <span className="text-[11px] font-bold tracking-wider uppercase">Queued</span>
            <Clock className="w-4 h-4 text-[#eab308]" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{queuedCount}</div>
        </div>

        {/* Scheduled */}
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 flex flex-col justify-between hover:border-[#2b3342] transition-colors">
          <div className="flex items-center justify-between text-[#8a96a8] mb-2">
            <span className="text-[11px] font-bold tracking-wider uppercase">Scheduled</span>
            <Calendar className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{scheduledCount}</div>
        </div>

        {/* Publishing */}
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 flex flex-col justify-between hover:border-[#2b3342] transition-colors">
          <div className="flex items-center justify-between text-[#8a96a8] mb-2">
            <span className="text-[11px] font-bold tracking-wider uppercase">Publishing</span>
            <PlayCircle className="w-4 h-4 text-[#a855f7]" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{publishingCount}</div>
        </div>

        {/* Published */}
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 flex flex-col justify-between hover:border-[#2b3342] transition-colors">
          <div className="flex items-center justify-between text-[#8a96a8] mb-2">
            <span className="text-[11px] font-bold tracking-wider uppercase">Published</span>
            <CheckCircle2 className="w-4 h-4 text-[#00e599]" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{publishedCount}</div>
        </div>
      </div>
    </div>
  );
};
