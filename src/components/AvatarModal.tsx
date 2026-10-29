'use client';

import React, { useState } from 'react';
import { SourceVideo } from '../lib/types';
import {
  X,
  Cpu,
  Mic,
  Play,
  Volume2,
  CheckCircle2,
  Sliders,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface AvatarModalProps {
  video: SourceVideo;
  isOpen: boolean;
  onClose: () => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [gestureIntensity, setGestureIntensity] = useState(75);
  const [eyeContactLock, setEyeContactLock] = useState(90);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12151b] border border-[#222a38] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="p-5 border-b border-[#1c222c] flex items-center justify-between bg-[#151921]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00e599]/15 border border-[#00e599]/30 flex items-center justify-center text-[#00e599]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Creator AI Digital Twin Engine
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00e599]/20 text-[#00e599] font-mono">
                  CALIBRATED
                </span>
              </h3>
              <p className="text-[11px] text-[#78899c]">
                Persistent Face Mesh, Micro-Expressions & Voice Identity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7c8d9f] hover:text-white hover:bg-[#1f2533] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Twin Visuals & 3D Mesh Inspection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Visual Frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#222b3a] bg-black">
              <img
                src={video.thumbnailUrl}
                alt="Face Mesh Preview"
                className="w-full h-full object-cover opacity-85"
              />
              {/* Green Cyber Mesh Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#00e599_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#00e599] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00e599] animate-ping" />
                  3D Face Mesh: 468 Landmarks
                </span>
                <span className="text-[10px] text-white/80 font-mono">
                  {video.avatarProfile.confidenceScore}% Precision
                </span>
              </div>
            </div>

            {/* Voice Profile Card */}
            <div className="bg-[#0d1015] border border-[#1d232e] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white">
                  <Mic className="w-4 h-4 text-[#00e599]" />
                  <span>Cloned Voice Identity</span>
                </div>
                <p className="text-[11px] text-[#7c8b9c] mb-3">
                  Extracted from 16-bit 44.1kHz audio sample. Ready for instant multi-script synthesis.
                </p>

                {/* Audio Waveform visualization */}
                <div className="flex items-end gap-1 h-12 bg-[#141820] p-2 rounded-lg border border-[#202734] mb-3">
                  {[40, 70, 30, 85, 95, 60, 45, 90, 75, 40, 80, 100, 65, 50, 85, 30, 60, 90].map(
                    (height, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-full transition-all ${
                          isPlayingVoice
                            ? 'bg-[#00e599] animate-pulse'
                            : 'bg-[#293444]'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Play Audio Sample Button */}
              <button
                type="button"
                onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                className="w-full py-2 px-3 rounded-lg bg-[#18202c] hover:bg-[#202938] border border-[#00e599]/30 text-xs text-[#00e599] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {isPlayingVoice ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                    <span>Playing Alex Cloned Audio...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-[#00e599]" />
                    <span>Test Voice Synthesis Sample</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Body Motion & Gesture Tuning */}
          <div className="bg-[#0d1015] border border-[#1d232e] rounded-xl p-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#00e599]" />
              <span>Digital Twin Dynamic Gesture Sliders</span>
            </h4>

            <div className="space-y-4">
              {/* Gesture Intensity */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#8e9cae]">
                    Natural Hand Gestures & Head Tilts
                  </span>
                  <span className="font-mono text-[#00e599]">{gestureIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gestureIntensity}
                  onChange={(e) => setGestureIntensity(Number(e.target.value))}
                  className="w-full accent-[#00e599] bg-[#1a202c] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Eye Contact Stability */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#8e9cae]">Eye Contact Retention</span>
                  <span className="font-mono text-[#00e599]">{eyeContactLock}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={eyeContactLock}
                  onChange={(e) => setEyeContactLock(Number(e.target.value))}
                  className="w-full accent-[#00e599] bg-[#1a202c] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Security & Verification Banner */}
          <div className="p-3 rounded-lg bg-[#00e599]/10 border border-[#00e599]/25 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00e599] shrink-0" />
            <p className="text-[11px] text-[#a4b4c4] leading-relaxed">
              <strong className="text-white">Consent & Profile Verified:</strong> This creator
              avatar is locked to your account. All 10 video variations synthesize strictly from
              this verified biometric profile.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#151921] border-t border-[#1c222c] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#00e599] hover:bg-[#00ffaa] text-black font-bold text-xs rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
