'use client';

import React, { useState } from 'react';
import { ScheduledPost } from '../lib/types';
import {
  CalendarDays,
  Clock,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
} from 'lucide-react';

interface CalendarDay {
  day: number;
  month: number;
  year: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface SocialCalendarViewProps {
  posts: ScheduledPost[];
}

export const SocialCalendarView: React.FC<SocialCalendarViewProps> = ({ posts }) => {
  const [currentMonth, setCurrentMonth] = useState('October 2026');
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Days of the week header
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Full 35-day Month Grid for October 2026 (5 rows x 7 days)
  const monthDays: CalendarDay[] = React.useMemo(() => {
    const days: CalendarDay[] = [];
    // 3 days from September: 28, 29, 30
    for (let d = 28; d <= 30; d++) {
      days.push({
        day: d,
        month: 9,
        year: 2026,
        dateStr: `${String(d).padStart(2, '0')}/09/2026`,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    // 31 days in October: 1 to 31
    for (let d = 1; d <= 31; d++) {
      days.push({
        day: d,
        month: 10,
        year: 2026,
        dateStr: `${String(d).padStart(2, '0')}/10/2026`,
        isCurrentMonth: true,
        isToday: d === 26,
      });
    }
    // 1 day from November: 1
    days.push({
      day: 1,
      month: 11,
      year: 2026,
      dateStr: '01/11/2026',
      isCurrentMonth: false,
      isToday: false,
    });
    return days;
  }, []);

  // Week days for the current week: Oct 26 to Nov 1
  const weekDays = React.useMemo(() => monthDays.slice(28, 35), [monthDays]);

  const displayedDays = viewMode === 'month' ? monthDays : weekDays;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12151b] border border-[#1e242e] rounded-xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[#1e2532] text-[#00e599] flex items-center justify-center">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Social Content Calendar
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18202c] text-[#00e599] font-mono border border-[#00e599]/30">
              {posts.length} Posts Queued
            </span>
          </div>
          <p className="text-xs text-[#78889b]">
            Visual timeline of your scheduled 10x variations across Instagram, TikTok, and YouTube Shorts.
          </p>
        </div>

        {/* Calendar Navigation & Mode Switcher */}
        <div className="flex items-center gap-3">
          {/* Month / Week Switcher */}
          <div className="flex rounded-lg overflow-hidden border border-[#202734] bg-[#0d1015]">
            <button
              onClick={() => setViewMode('month')}
              className={`text-xs px-3 py-1.5 font-semibold transition-colors ${
                viewMode === 'month' ? 'bg-[#00e599] text-black' : 'text-[#8e9cae] hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`text-xs px-3 py-1.5 font-semibold transition-colors ${
                viewMode === 'week' ? 'bg-[#00e599] text-black' : 'text-[#8e9cae] hover:text-white'
              }`}
            >
              Week
            </button>
          </div>

          {/* Month Selector */}
          <div className="flex items-center gap-1 bg-[#0d1015] border border-[#202734] rounded-lg px-2.5 py-1">
            <button className="text-[#6d7e93] hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-white px-2">{currentMonth}</span>
            <button className="text-[#6d7e93] hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pacing & Stagger Alert Bar */}
      <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-[#00e599]">
          <Shuffle className="w-4 h-4" />
          <span className="font-semibold text-white">Smart 15-Minute Platform Stagger:</span>
          <span className="text-[#8e9cae]">
            Releases between Instagram & YouTube are automatically offset to maximize organic reach.
          </span>
        </div>
        <span className="text-[11px] text-[#637385] font-mono">
          Optimal Posting Window: 11:30 AM – 09:30 PM
        </span>
      </div>

      {/* Calendar Grid (Full 35-Day Month Grid or 7-Day Week Grid) */}
      <div className="bg-[#12151b] border border-[#1e242e] rounded-xl overflow-hidden shadow-xl">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-[#1c222c] bg-[#151921] text-center text-xs font-bold text-[#627387] py-2.5 uppercase tracking-wider">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Days Grid: 35 days in month view, 7 days in week view */}
        <div
          className={`grid grid-cols-7 divide-x divide-y divide-[#181d26] ${
            viewMode === 'month' ? 'min-h-[600px]' : 'min-h-[480px]'
          }`}
        >
          {displayedDays.map((col, idx) => {
            const dayPosts = posts.filter(
              (p) => p.scheduledDate === col.dateStr || (col.isToday && posts.length > 0)
            );

            return (
              <div
                key={idx}
                className={`p-2 flex flex-col justify-between transition-colors ${
                  viewMode === 'month' ? 'min-h-[120px]' : 'min-h-[460px] p-3'
                } ${
                  col.isToday
                    ? 'bg-[#00e599]/5 border-t border-[#00e599]/30'
                    : col.isCurrentMonth
                    ? 'bg-[#0d1016]'
                    : 'bg-[#07090d]/60 opacity-40'
                } hover:bg-[#121620]`}
              >
                {/* Date header in cell */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      col.isToday
                        ? 'bg-[#00e599] text-black font-extrabold shadow-sm shadow-[#00e599]/30'
                        : col.isCurrentMonth
                        ? 'text-[#8e9cae]'
                        : 'text-[#475467]'
                    }`}
                  >
                    {col.day}
                  </span>
                  {dayPosts.length > 0 && (
                    <span className="text-[9px] text-[#00e599] font-mono font-bold">
                      {dayPosts.length} {dayPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                  )}
                </div>

                {/* Scheduled Posts in this date */}
                <div className="space-y-1.5 flex-1 overflow-hidden">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-[#141822] hover:bg-[#1a202c] border border-[#222a38] rounded-lg p-1.5 transition-all cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-mono text-[#38bdf8] flex items-center gap-1 font-semibold">
                          <Clock className="w-2.5 h-2.5" />
                          {post.scheduledTime}
                        </span>

                        {/* Platform Pills */}
                        <div className="flex gap-0.5">
                          {post.platforms.map((pl) => (
                            <span
                              key={pl}
                              className="text-[8px] font-bold px-1 py-0.2 rounded uppercase bg-[#1e2533] text-[#00e599]"
                            >
                              {pl === 'youtube' ? 'YT' : pl === 'instagram' ? 'IG' : 'TT'}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-6 rounded overflow-hidden bg-black shrink-0 border border-white/10">
                          <img
                            src={post.thumbnailUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold text-white truncate">
                            {post.hookType}
                          </p>
                          <p className="text-[8.5px] text-[#718296] truncate">
                            {post.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
