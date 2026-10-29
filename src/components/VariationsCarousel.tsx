'use client';

import React, { useRef, useState } from 'react';
import { VideoVariation } from '../lib/types';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  FileText,
  Download,
  Copy,
  Sparkles,
  Check,
  Scissors,
  CheckSquare,
  Square,
} from 'lucide-react';

interface VariationsCarouselProps {
  variations: VideoVariation[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onOpenScript: (variation: VideoVariation) => void;
}

export const VariationsCarousel: React.FC<VariationsCarouselProps> = ({
  variations,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onOpenScript,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedCount = variations.filter((v) => v.isSelected).length;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCopyScript = (v: VideoVariation) => {
    navigator.clipboard.writeText(v.fullScript);
    setCopiedId(v.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mt-8 mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#00e599] animate-pulse" />
          <h2 className="text-xs font-bold tracking-wider text-[#a0afc2] uppercase flex items-center gap-2">
            Generated 10x Variations
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#18202c] text-[#00e599] font-mono border border-[#00e599]/30">
              {variations.length} clips ready
            </span>
          </h2>
          <span className="text-xs text-[#6e7d90] hidden md:inline">
            • Single-row carousel • {selectedCount} of {variations.length} selected for scheduling
          </span>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2">
          {selectedCount === variations.length ? (
            <button
              onClick={onDeselectAll}
              className="text-xs text-[#8e9cae] hover:text-white px-2.5 py-1 rounded bg-[#13171f] border border-[#202632] transition-colors"
            >
              Deselect All
            </button>
          ) : (
            <button
              onClick={onSelectAll}
              className="text-xs text-[#00e599] hover:text-[#00ffaa] px-2.5 py-1 rounded bg-[#13171f] border border-[#00e599]/30 transition-colors"
            >
              Select All ({variations.length})
            </button>
          )}

          {/* Carousel Arrows */}
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-lg bg-[#141820] hover:bg-[#1f2533] border border-[#222936] text-[#8e9cae] hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-lg bg-[#141820] hover:bg-[#1f2533] border border-[#222936] text-[#8e9cae] hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel (Single Row) */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-scroll-x scrollbar-thin scrollbar-thumb-[#232936] scrollbar-track-transparent"
        style={{ scrollbarWidth: 'thin' }}
      >
        {variations.map((item) => {
          const isPlaying = playingId === item.id;
          return (
            <div
              key={item.id}
              className={`snap-scroll-item shrink-0 w-[240px] sm:w-[260px] bg-[#12151b] rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between group ${
                item.isSelected
                  ? 'border-[#00e599]/60 shadow-lg shadow-[#00e599]/10'
                  : 'border-[#1e242e] hover:border-[#2f394a]'
              }`}
            >
              {/* Card Top: Checkbox & Hook Type */}
              <div className="p-3 pb-2 flex items-center justify-between bg-[#151921] border-b border-[#1c222c]">
                <button
                  type="button"
                  onClick={() => onToggleSelect(item.id)}
                  className="flex items-center gap-2 text-left"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      item.isSelected
                        ? 'bg-[#00e599] text-black font-bold'
                        : 'border border-[#434f62] bg-[#0d1015]'
                    }`}
                  >
                    {item.isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-bold text-white">
                    Var #{item.number}
                  </span>
                </button>

                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#1d232e] text-[#00e599] border border-[#00e599]/30">
                  {item.hookType}
                </span>
              </div>

              {/* 9:16 Video Preview Frame */}
              <div className="relative aspect-[9/14] bg-black overflow-hidden group/video">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105 ${
                    isPlaying ? 'opacity-85' : 'opacity-95'
                  }`}
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#38bdf8] border border-[#38bdf8]/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                    {item.retentionScore}% Retention
                  </span>

                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/75 text-white/90">
                    {item.durationFormatted}
                  </span>
                </div>

                {/* Subtitle / Caption Simulation Preview Overlay */}
                <div className="absolute inset-x-3 bottom-3 text-center pointer-events-none">
                  <div className="inline-block bg-black/85 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/10 shadow-lg">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide leading-tight text-white drop-shadow">
                      {item.number === 1 && (
                        <span>
                          STOP USING AI <span className="text-[#00e599]">FOR PRODUCTIVITY</span>
                        </span>
                      )}
                      {item.number === 2 && (
                        <span>
                          I LOST <span className="text-[#00e599]">10,000 VIEWS</span> UNTIL THIS
                        </span>
                      )}
                      {item.number === 3 && (
                        <span>
                          THE 3-STEP <span className="text-[#facc15]">NO FLUFF</span> FORMULA
                        </span>
                      )}
                      {item.number === 4 && (
                        <span>
                          IF YOU IGNORE <span className="text-[#f43f5e]">THIS IN 2026</span>
                        </span>
                      )}
                      {item.number > 4 && (
                        <span>
                          {item.hookText.slice(0, 32)} <span className="text-[#00e599]">...</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Center Play/Pause Button */}
                <button
                  type="button"
                  onClick={() => setPlayingId(isPlaying ? null : item.id)}
                  className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-[#00e599] hover:bg-[#00ffaa] text-black flex items-center justify-center shadow-lg shadow-[#00e599]/40 transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  )}
                </button>

                {/* Editing Cadence Chip */}
                <div className="absolute bottom-11 right-2 pointer-events-none">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-[#9bb0c9] flex items-center gap-1 border border-white/10">
                    <Scissors className="w-2.5 h-2.5 text-[#00e599]" />
                    {item.cutsCount} cuts • {item.zoomInsCount} zooms
                  </span>
                </div>
              </div>

              {/* Card Footer: Script preview & action buttons */}
              <div className="p-3 bg-[#12151b]">
                <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#78889b] line-clamp-2 mb-3 leading-relaxed">
                  "{item.hookText}"
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-[#1c222c]">
                  <button
                    onClick={() => onOpenScript(item)}
                    className="flex-1 flex items-center justify-center gap-1 text-[11px] bg-[#161a22] hover:bg-[#1e2430] text-[#00e599] font-medium py-1.5 rounded-lg border border-[#00e599]/25 transition-colors"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Script</span>
                  </button>

                  <button
                    onClick={() => handleCopyScript(item)}
                    title="Copy full script"
                    className="p-1.5 bg-[#161a22] hover:bg-[#1e2430] text-[#8e9cae] hover:text-white rounded-lg border border-[#222936] transition-colors"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-[#00e599]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => alert(`Downloading ${item.title}.mp4 (1080p rendered)`)}
                    title="Download 1080p MP4"
                    className="p-1.5 bg-[#161a22] hover:bg-[#1e2430] text-[#8e9cae] hover:text-white rounded-lg border border-[#222936] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
