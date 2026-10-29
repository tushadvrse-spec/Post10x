'use client';

import React from 'react';
import { Zap, Wand2 } from 'lucide-react';

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
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const creditCost = variationCount * 2;

  return (
    <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 flex flex-col justify-between hover:border-[#28313f] transition-all h-full">
      {/* Top Header & Settings Group */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
            Variation Settings
          </span>
          <span className="text-[10px] text-[#00e599] font-medium flex items-center gap-1 bg-[#00e599]/10 px-2 py-0.5 rounded border border-[#00e599]/20 font-mono">
            <Zap className="w-3 h-3" />
            <span>AI Multiplier</span>
          </span>
        </div>

        <p className="text-xs text-[#8e98a8] mb-3">
          Choose how many 9:16 viral short variations to generate from this video.
        </p>

        {/* Number of Variations Selector Card */}
        <div className="bg-[#0b0e13] border border-[#1d2430] rounded-xl p-3.5 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">
              Number of Variations
            </span>
            <span className="text-xs font-bold text-[#00e599] font-mono">
              {variationCount} variations
            </span>
          </div>

          <p className="text-[11px] text-[#718296] mb-2.5">
            Each variation receives a unique viral hook angle, animated captions, and calibrated pacing.
          </p>

          {/* Number Pill Buttons */}
          <div className="grid grid-cols-9 gap-1.5 mb-3">
            {numbers.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onCountChange(num)}
                disabled={isGenerating}
                className={`py-2 text-xs rounded-lg font-bold transition-all ${
                  variationCount === num
                    ? 'bg-[#00e599] text-black shadow-md shadow-[#00e599]/25 scale-105'
                    : 'bg-[#151922] text-[#8e98a8] hover:text-white hover:bg-[#1e2533] border border-[#222936]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Credit Calculation Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1a202c] text-[11px]">
            <span className="text-[#8e98a8]">
              Credit Cost:{' '}
              <strong className="text-white font-semibold">{creditCost} credits</strong>
            </span>
            <span className="text-[#647284] font-mono">2 credits per variation</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
          isGenerating
            ? 'bg-[#182a22] text-[#00e599] border border-[#00e599]/30 cursor-wait'
            : 'bg-[#00e599] hover:bg-[#00ffaa] text-black shadow-lg shadow-[#00e599]/25 hover:shadow-[#00e599]/40 active:scale-[0.99]'
        }`}
      >
        {isGenerating ? (
          <>
            <Wand2 className="w-4 h-4 animate-spin text-[#00e599]" />
            <div className="text-left">
              <p className="leading-tight text-xs font-bold">Synthesizing {variationCount} Variations...</p>
              <p className="text-[10px] text-[#00e599]/80 font-normal">{generationStep}</p>
            </div>
          </>
        ) : (
          <>
            <span>Generate {variationCount} Variations</span>
            <span className="text-xs font-normal opacity-80">
              ({variationCount} vertical shorts • {creditCost} credits)
            </span>
          </>
        )}
      </button>
    </div>
  );
};
