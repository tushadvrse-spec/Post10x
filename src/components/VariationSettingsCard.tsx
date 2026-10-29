'use client';

import React, { useState } from 'react';
import { Sparkles, Sliders, Zap, Check, Wand2, Smartphone, Film } from 'lucide-react';

interface VariationSettingsCardProps {
  variationCount: number;
  onCountChange: (count: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  generationStep: string;
}

export const VariationSettingsCard: React.FC<VariationSettingsCardProps> = ({
  variationCount,
  onCountChange,
  onGenerate,
  isGenerating,
  generationStep,
}) => {
  const [detectionMode, setDetectionMode] = useState<'auto' | 'custom'>('auto');

  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const creditCost = variationCount * 2;

  return (
    <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 flex flex-col justify-between hover:border-[#28313f] transition-all h-full">
      {/* Top Header & Settings Group */}
      <div className="space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
              Timestamp & Variation Settings
            </span>
            <span className="text-[10px] text-[#00e599] font-medium flex items-center gap-1 bg-[#00e599]/10 px-2 py-0.5 rounded border border-[#00e599]/20 font-mono">
              <Zap className="w-3 h-3" />
              <span>AI Short Multiplier</span>
            </span>
          </div>

          <p className="text-xs text-[#8e98a8]">
            Multiply 1 vertical short into {variationCount} distinct 9:16 viral variations with unique hook angles.
          </p>
        </div>

        {/* 9:16 Short-Form Multiplication Specs Card */}
        <div className="bg-[#0b0e13] border border-[#1d2430] rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#00e599]" />
              <span className="text-xs font-semibold text-white">Target Video Format</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30 font-bold">
              9:16 LOCKED
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] text-[#8e98a8]">
            <div className="bg-[#12161f] p-1.5 rounded border border-[#1e2533]">
              <span className="text-[#556578] block text-[9px] uppercase font-mono">Platform</span>
              <span className="text-white font-medium truncate">Reels • TikTok • Shorts</span>
            </div>
            <div className="bg-[#12161f] p-1.5 rounded border border-[#1e2533]">
              <span className="text-[#556578] block text-[9px] uppercase font-mono">Aspect Ratio</span>
              <span className="text-[#00e599] font-mono font-bold">9:16 (1080×1920)</span>
            </div>
            <div className="bg-[#12161f] p-1.5 rounded border border-[#1e2533]">
              <span className="text-[#556578] block text-[9px] uppercase font-mono">Subtitles</span>
              <span className="text-[#38bdf8] font-medium">Dynamic 60fps</span>
            </div>
          </div>
        </div>

        {/* Hook Generation Strategy */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider font-mono">
              Hook Generation Strategy
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDetectionMode('auto')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 px-3 rounded-lg font-medium transition-all ${
                detectionMode === 'auto'
                  ? 'bg-[#00e599] text-black font-semibold shadow-md shadow-[#00e599]/20'
                  : 'bg-[#181c24] text-[#8e98a8] hover:text-white border border-[#222936]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto Detect Viral Hooks</span>
            </button>

            <button
              type="button"
              onClick={() => setDetectionMode('custom')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 px-3 rounded-lg font-medium transition-all ${
                detectionMode === 'custom'
                  ? 'bg-[#00e599] text-black font-semibold shadow-md shadow-[#00e599]/20'
                  : 'bg-[#181c24] text-[#8e98a8] hover:text-white border border-[#222936]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Custom Script Angles</span>
            </button>
          </div>

          {/* Viral Hook Presets Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[10px] text-[#556578] font-mono uppercase">Presets:</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#12161f] text-[#8fa1b4] border border-[#202936]">
              ⚡ Contrarian
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#12161f] text-[#8fa1b4] border border-[#202936]">
              🔍 Curiosity Gap
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#12161f] text-[#8fa1b4] border border-[#202936]">
              📖 Story/POV
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#12161f] text-[#8fa1b4] border border-[#202936]">
              ⏱️ Framework
            </span>
          </div>
        </div>

        {/* Number of Variations Selector */}
        <div className="bg-[#0b0e13] border border-[#1d2430] rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">
              Number of Variations to Generate
            </span>
            <span className="text-xs font-bold text-[#00e599] font-mono">
              {variationCount} variations
            </span>
          </div>

          <p className="text-[11px] text-[#788799] mb-2">
            Generates {variationCount} distinct 9:16 short-form variations with tailored viral hooks and subtitle pacing.
          </p>

          {/* Number Pill Buttons */}
          <div className="grid grid-cols-9 gap-1.5 mb-2.5">
            {numbers.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onCountChange(num)}
                disabled={isGenerating}
                className={`py-1.5 text-xs rounded font-bold transition-all ${
                  variationCount === num
                    ? 'bg-[#00e599] text-black shadow-md shadow-[#00e599]/20 scale-105'
                    : 'bg-[#161a22] text-[#8e98a8] hover:text-white hover:bg-[#1e2430] border border-[#222936]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Credit Calculation Bar */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[#1a1f28] text-[11px]">
            <span className="text-[#8e98a8]">
              Credit Cost:{' '}
              <strong className="text-white font-semibold">{creditCost} credits</strong>
            </span>
            <span className="text-[#647284] font-mono">2 credits per 9:16 variation</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-[#182a22] text-[#00e599] border border-[#00e599]/30 cursor-wait'
              : 'bg-[#00e599] hover:bg-[#00ffaa] text-black shadow-lg shadow-[#00e599]/25 hover:shadow-[#00e599]/40 active:scale-[0.99]'
          }`}
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 animate-spin text-[#00e599]" />
              <div className="text-left">
                <p className="leading-tight text-xs font-bold">Synthesizing 9:16 Variations...</p>
                <p className="text-[10px] text-[#00e599]/80 font-normal">{generationStep}</p>
              </div>
            </>
          ) : (
            <>
              <span>Generate {variationCount} 9:16 Variations</span>
              <span className="text-xs font-normal opacity-80">
                (Synthesize {variationCount} vertical shorts • {creditCost} credits)
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
