'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, Check, Shield, ExternalLink, Sparkles } from 'lucide-react';

interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [geminiKey, setGeminiKey] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [falKey, setFalKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load configured keys on open
  useEffect(() => {
    async function fetchKeys() {
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            if (data.data.geminiMasked) setGeminiKey(data.data.geminiMasked);
            if (data.data.elevenLabsMasked) setElevenLabsKey(data.data.elevenLabsMasked);
            if (data.data.falMasked) setFalKey(data.data.falMasked);
            if (data.data.groqMasked) setGroqKey(data.data.groqMasked);
          }
        }
      } catch (e) {
        // ignore
      }
    }
    fetchKeys();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiKey,
          elevenLabsKey,
          falKey,
          groqKey,
        }),
      });

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Save keys error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12151b] border border-[#222a38] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#1c222c] flex items-center justify-between bg-[#151921]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00e599]/15 border border-[#00e599]/30 flex items-center justify-center text-[#00e599]">
              <Key className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Live AI Production Engine Keys
              </h3>
              <p className="text-[11px] text-[#718296]">
                Configure real API keys to power the end-to-end video pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7c8d9f] hover:text-white hover:bg-[#1f2533] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* ElevenLabs API Key */}
          <div className="p-3 bg-[#0d1015] border border-[#1e242e] rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-[#a0b0c2] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e599]" />
                ElevenLabs API Key (Authentic Voice Clone & TTS)
              </label>
              <a
                href="https://elevenlabs.io/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#00e599] hover:underline flex items-center gap-1"
              >
                Get Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="password"
              value={elevenLabsKey}
              onChange={(e) => setElevenLabsKey(e.target.value)}
              placeholder="sk_eleven_..."
              className="w-full bg-[#141820] border border-[#222936] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#00e599]"
            />
          </div>

          {/* Fal.ai API Key (LivePortrait / LatentSync) */}
          <div className="p-3 bg-[#0d1015] border border-[#1e242e] rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-[#a0b0c2] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                Fal.ai Key (LivePortrait / LatentSync Video Engine)
              </label>
              <a
                href="https://fal.ai/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#38bdf8] hover:underline flex items-center gap-1"
              >
                Get Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="password"
              value={falKey}
              onChange={(e) => setFalKey(e.target.value)}
              placeholder="fal_key_..."
              className="w-full bg-[#141820] border border-[#222936] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          {/* Gemini API Key */}
          <div className="p-3 bg-[#0d1015] border border-[#1e242e] rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-[#a0b0c2] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                Google Gemini 2.0 API Key (Video Cadence & 10x Scripts)
              </label>
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#eab308] hover:underline flex items-center gap-1"
              >
                Get Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#141820] border border-[#222936] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#eab308]"
            />
          </div>

          {/* Groq Cloud Key */}
          <div className="p-3 bg-[#0d1015] border border-[#1e242e] rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-[#a0b0c2] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                Groq Cloud Key (Whisper Word Timestamps & Captions)
              </label>
              <a
                href="https://console.groq.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#a855f7] hover:underline flex items-center gap-1"
              >
                Get Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full bg-[#141820] border border-[#222936] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a855f7]"
            />
          </div>

          <div className="p-3 bg-[#00e599]/10 rounded-lg border border-[#00e599]/25 flex items-center gap-2.5 text-[11px] text-[#a4b4c4]">
            <Shield className="w-4 h-4 text-[#00e599] shrink-0" />
            <span>
              Keys are encrypted in server memory and used directly for live video synthesis. Leave any field blank to use our pre-calibrated test profile.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#151921] border-t border-[#1c222c] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs text-[#8e9cae] hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-[#00e599] hover:bg-[#00ffaa] text-black transition-colors flex items-center gap-1.5 shadow-md shadow-[#00e599]/20"
          >
            {saved ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{saved ? 'Active & Saved!' : 'Save & Activate Keys'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
