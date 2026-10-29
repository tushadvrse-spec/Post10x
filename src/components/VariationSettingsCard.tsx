'use client';

import React, { useState } from 'react';
import { Sparkles, Sliders, Zap, Check, Wand2 } from 'lucide-react';

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
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
            Timestamp & Variation Settings
          </span>
          <span className="text-[10px] text-[#00e599] font-medium flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>AI Multiplier</span>
          </span>
        </div>

        <p className="text-xs text-[#8e98a8] mb-4">
          Choose auto detection or specify custom psychological angles for your variations.
        </p>

        {/* Mode Selector Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setDetectionMode('auto')}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              detectionMode === 'auto'
                ? 'bg-[#00e599] text-black font-semibold shadow-md shadow-[#00e599]/20'
                : 'bg-[#181c24] text-[#8e98a8] hover:text-white border border-[#222936]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto Detect Viral Hooks</span>
          </button>

          <button
            onClick={() => setDetectionMode('custom')}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              detectionMode === 'custom'
                ? 'bg-[#00e599] text-black font-semibold shadow-md shadow-[#00e599]/20'
                : 'bg-[#181c24] text-[#8e98a8] hover:text-white border border-[#222936]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Custom Script Angles</span>
          </button>
        </div>

        {/* Number of Variations Selector */}
        <div className="bg-[#0d1015] border border-[#1c222c] rounded-lg p-4 mb-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">
              Number of Variations to Generate
            </span>
            <span className="text-xs font-bold text-[#00e599]">
              {variationCount} variations
            </span>
          </div>

          <p className="text-[11px] text-[#788799] mb-3">
            Detects the top {variationCount} highest-retention moments and generates distinct script angles.
          </p>

          {/* Number Pill Buttons */}
          <div className="grid grid-cols-9 gap-1.5 mb-4">
            {numbers.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onCountChange(num)}
                disabled={isGenerating}
                className={`py-2 text-xs rounded font-bold transition-all ${
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
          <div className="flex items-center justify-between pt-2 border-t border-[#1a1f28] text-[11px]">
            <span className="text-[#8e98a8]">
              Credit Cost:{' '}
              <strong className="text-white font-semibold">{creditCost} credits</strong>
            </span>
            <span className="text-[#647284]">2 credits per variation</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-[#182a22] text-[#00e599] border border-[#00e599]/30 cursor-wait'
              : 'bg-[#00e599] hover:bg-[#00ffaa] text-black shadow-lg shadow-[#00e599]/25 hover:shadow-[#00e599]/40 active:scale-[0.99]'
          }`}
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 animate-spin text-[#00e599]" />
              <div className="text-left">
                <p className="leading-tight text-xs font-bold">Synthesizing Variations...</p>
                <p className="text-[10px] text-[#00e599]/80 font-normal">{generationStep}</p>
              </div>
            </>
          ) : (
            <>
              <span>Generate {variationCount} Variations</span>
              <span className="text-xs font-normal opacity-80">
                (Ready to generate {variationCount} variations • {creditCost} credits)
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
