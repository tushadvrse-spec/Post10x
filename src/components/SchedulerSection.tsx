'use client';

import React, { useState } from 'react';
import { VideoVariation, TargetChannel, SchedulerSettings } from '../lib/types';
import {
  Calendar,
  Clock,
  Shuffle,
  CheckCircle,
  Plus,
  ArrowRight,
  Sparkles,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SchedulerSectionProps {
  variations: VideoVariation[];
  channels: TargetChannel[];
  onToggleChannel: (id: string) => void;
  onSelectAllChannels: () => void;
  onSchedulePosts: (settings: SchedulerSettings) => void;
}

export const SchedulerSection: React.FC<SchedulerSectionProps> = ({
  variations,
  channels,
  onToggleChannel,
  onSelectAllChannels,
  onSchedulePosts,
}) => {
  const selectedVariations = variations.filter((v) => v.isSelected);
  const selectedChannels = channels.filter((c) => c.isSelected);

  const [settings, setSettings] = useState<SchedulerSettings>({
    startDate: '26/10/2026',
    postingWindowStart: '11:30',
    postingWindowEnd: '21:30',
    dailyFrequency: 3,
    gapHours: 3,
    smartStagger: true,
  });

  const [isScheduling, setIsScheduling] = useState(false);

  const handleScheduleClick = () => {
    if (selectedVariations.length === 0 || selectedChannels.length === 0) {
      alert('Please select at least 1 video variation and 1 target channel.');
      return;
    }

    setIsScheduling(true);
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00e599', '#38bdf8', '#ffffff'],
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      onSchedulePosts(settings);
      setIsScheduling(false);
    }, 700);
  };

  const totalPublishingJobs = selectedVariations.length * selectedChannels.length;

  return (
    <div className="space-y-4 mb-8">
      {/* Top 2 Columns: (1) SELECT VIDEOS & (2) TARGET CHANNELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* (1) SELECT VIDEOS */}
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 hover:border-[#28313f] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1e2532] text-xs font-bold text-[#00e599] flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
                Select Videos
              </span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#18202c] text-[#788ca5] font-mono border border-[#222d3d]">
              {selectedVariations.length} of {variations.length} Selected
            </span>
          </div>

          {selectedVariations.length === 0 ? (
            <div className="h-32 rounded-lg border border-dashed border-[#222936] bg-[#0d1015] flex flex-col items-center justify-center text-center p-4">
              <p className="text-xs font-semibold text-[#8e98a8] mb-1">
                No videos selected yet
              </p>
              <p className="text-[11px] text-[#556375]">
                Check the boxes on the generated variation cards above to schedule.
              </p>
            </div>
          ) : (
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {selectedVariations.map((v) => (
                <div
                  key={v.id}
                  className="shrink-0 w-28 bg-[#171b23] border border-[#222a38] rounded-lg p-2 text-left"
                >
                  <div className="aspect-[9/12] rounded bg-black overflow-hidden mb-1.5 relative">
                    <img
                      src={v.thumbnailUrl}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 rounded text-white font-mono">
                      #{v.number}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-white truncate">
                    {v.hookType}
                  </p>
                  <p className="text-[9px] text-[#718296] truncate">{v.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* (2) TARGET CHANNELS */}
        <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 hover:border-[#28313f] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1e2532] text-xs font-bold text-[#00e599] flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
                Target Channels ({selectedChannels.length}/{channels.length})
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={onSelectAllChannels}
                className="text-[#00e599] hover:underline text-[11px] font-medium"
              >
                Select All
              </button>
              <span className="text-[#3b4759]">•</span>
              <button className="text-[#7e8b9b] hover:text-white text-[11px]">
                + Manage
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {channels.map((ch) => (
              <div
                key={ch.id}
                onClick={() => onToggleChannel(ch.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  ch.isSelected
                    ? 'bg-[#151c24] border-[#00e599]/40'
                    : 'bg-[#0d1015] border-[#1e242e] hover:border-[#2b3342]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={ch.isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-[#00e599] bg-[#12151b] cursor-pointer"
                  />
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#252f3f]">
                    <img
                      src={ch.avatarUrl}
                      alt={ch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{ch.name}</p>
                    <p className="text-[10px] text-[#00e599] font-mono tracking-wide">
                      {ch.username}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-[#6d7e93] hover:text-white font-medium">
                  {ch.isSelected ? 'CONNECTED' : 'TAP TO ADD'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* (3) SCHEDULE & PACING */}
      <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 hover:border-[#28313f] transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-5 rounded-full bg-[#1e2532] text-xs font-bold text-[#00e599] flex items-center justify-center">
            3
          </span>
          <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
            Schedule & Pacing
          </span>
        </div>

        {/* Form Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {/* Start Date */}
          <div>
            <label className="block text-[11px] font-bold text-[#7e8b9b] uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={settings.startDate}
                onChange={(e) =>
                  setSettings({ ...settings, startDate: e.target.value })
                }
                className="w-full bg-[#0d1015] border border-[#1e242e] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e599]"
              />
              <Calendar className="absolute right-3 top-2.5 w-3.5 h-3.5 text-[#6c7d91]" />
            </div>
          </div>

          {/* Posting Window */}
          <div>
            <label className="block text-[11px] font-bold text-[#7e8b9b] uppercase tracking-wider mb-1.5">
              Posting Window
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={settings.postingWindowStart}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      postingWindowStart: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d1015] border border-[#1e242e] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e599]"
                />
                <Clock className="absolute right-2 top-2.5 w-3.5 h-3.5 text-[#6c7d91]" />
              </div>
              <span className="text-xs text-[#526072]">to</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={settings.postingWindowEnd}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      postingWindowEnd: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d1015] border border-[#1e242e] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e599]"
                />
                <Clock className="absolute right-2 top-2.5 w-3.5 h-3.5 text-[#6c7d91]" />
              </div>
            </div>
          </div>

          {/* Daily Frequency */}
          <div>
            <label className="block text-[11px] font-bold text-[#7e8b9b] uppercase tracking-wider mb-1.5">
              Daily Frequency
            </label>
            <select
              value={settings.dailyFrequency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  dailyFrequency: Number(e.target.value),
                })
              }
              className="w-full bg-[#0d1015] border border-[#1e242e] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e599]"
            >
              <option value={1}>1 post/day</option>
              <option value={2}>2 posts/day</option>
              <option value={3}>3 posts/day (Recommended)</option>
              <option value={4}>4 posts/day</option>
              <option value={5}>5 posts/day</option>
            </select>
          </div>

          {/* Gap Between Posts */}
          <div>
            <label className="block text-[11px] font-bold text-[#7e8b9b] uppercase tracking-wider mb-1.5">
              Gap Between Posts
            </label>
            <select
              value={settings.gapHours}
              onChange={(e) =>
                setSettings({ ...settings, gapHours: Number(e.target.value) })
              }
              className="w-full bg-[#0d1015] border border-[#1e242e] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e599]"
            >
              <option value={2}>2 hours interval</option>
              <option value={3}>3 hours interval (Recommended)</option>
              <option value={4}>4 hours interval</option>
              <option value={6}>6 hours interval</option>
            </select>
          </div>
        </div>

        {/* Bottom Stagger Toggle & Execution Bar */}
        <div className="pt-4 border-t border-[#1a1f28] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Smart Platform Stagger Toggle */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#141b24] border border-[#212c3b] flex items-center justify-center text-[#00e599]">
              <Shuffle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  Smart Platform Stagger
                </span>
                <span className="text-[10px] text-[#718398]">(15 min offset)</span>
              </div>
              <p className="text-[10px] text-[#5b6c80]">
                Offsets releases between Instagram, TikTok & YouTube
              </p>
            </div>

            <div className="flex rounded-lg overflow-hidden border border-[#232a37] ml-2">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, smartStagger: true })}
                className={`text-[11px] px-3 py-1 font-semibold transition-colors ${
                  settings.smartStagger
                    ? 'bg-[#00e599] text-black'
                    : 'bg-[#12151b] text-[#78889b]'
                }`}
              >
                Enable
              </button>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, smartStagger: false })}
                className={`text-[11px] px-3 py-1 font-semibold transition-colors ${
                  !settings.smartStagger
                    ? 'bg-[#202735] text-white'
                    : 'bg-[#12151b] text-[#78889b]'
                }`}
              >
                Disable
              </button>
            </div>
          </div>

          {/* Schedule Scope & Submit Button */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="text-right">
              <p className="text-[11px] text-[#7d8e9f]">
                SCHEDULE SCOPE:{' '}
                <strong className="text-white">
                  {selectedVariations.length} videos × {selectedChannels.length} channels
                </strong>
              </p>
              <p className="text-[10px] text-[#556475]">
                Credit Cost: <span className="text-[#00e599] font-mono">0.0 Credits</span>
              </p>
            </div>

            <button
              onClick={handleScheduleClick}
              disabled={isScheduling}
              className="bg-[#00e599] hover:bg-[#00ffaa] text-black font-bold text-xs px-5 py-3 rounded-lg shadow-lg shadow-[#00e599]/25 flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>{isScheduling ? 'Scheduling...' : 'Schedule posts and preview'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
