'use client';

import React, { useState } from 'react';
import { VideoVariation } from '../lib/types';
import { X, Copy, Check, Sparkles, RefreshCw, Save } from 'lucide-react';

interface ScriptModalProps {
  variation: VideoVariation | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveScript: (id: string, updatedScript: string) => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  variation,
  isOpen,
  onClose,
  onSaveScript,
}) => {
  if (!isOpen || !variation) return null;

  const [scriptText, setScriptText] = useState(variation.fullScript);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    if (variation) {
      setScriptText(variation.fullScript);
    }
  }, [variation]);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveScript(variation.id, scriptText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12151b] border border-[#222a38] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#1c222c] flex items-center justify-between bg-[#151921]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30">
              Var #{variation.number}
            </span>
            <span className="text-xs font-bold text-white">
              {variation.hookType}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7c8d9f] hover:text-white hover:bg-[#1f2533] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[#8e9cae]">
                Hook & Full Voice Script:
              </label>
              <span className="text-[10px] text-[#5e6f82]">
                Est. Duration: {variation.durationFormatted} • {variation.retentionScore}% Predicted Retention
              </span>
            </div>

            <textarea
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              rows={8}
              className="w-full bg-[#0d1015] border border-[#1e242e] rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-[#00e599] font-mono resize-none"
            />
          </div>

          {/* Subtitle / Captioning Style */}
          <div className="p-3 bg-[#0d1015] border border-[#1e242e] rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Animated Caption Preset</p>
              <p className="text-[10px] text-[#718296]">{variation.subtitleStyle} • Word-level Karaoke sync</p>
            </div>
            <span className="text-[10px] bg-[#00e599]/20 text-[#00e599] font-mono px-2 py-0.5 rounded border border-[#00e599]/30">
              Active
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#151921] border-t border-[#1c222c] flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-[#8e9cae] hover:text-white px-3 py-1.5 rounded-lg bg-[#181d26] border border-[#232b38] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00e599]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Script'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs text-[#8e9cae] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#00e599] hover:bg-[#00ffaa] text-black transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved!' : 'Save Script Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
