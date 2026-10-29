'use client';

import React, { useState } from 'react';
import { SourceVideo, VideoVariation } from '../lib/types';
import { sample10Variations } from '../lib/mockData';
import {
  FolderGit2,
  Cpu,
  Mic,
  Film,
  Download,
  Play,
  Volume2,
  CheckCircle,
  Sparkles,
  X,
  Layers,
  Eye,
} from 'lucide-react';

interface AssetVaultViewProps {
  sourceVideo: SourceVideo;
  variations: VideoVariation[];
  allVariations?: VideoVariation[];
}

export const AssetVaultView: React.FC<AssetVaultViewProps> = ({
  sourceVideo,
  variations,
  allVariations,
}) => {
  // 1. Default to 'videos' (Rendered Videos) as requested by user
  const [activeTab, setActiveTab] = useState<'videos' | 'all' | 'twins' | 'voices'>('videos');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [filterBatch, setFilterBatch] = useState<'all' | 'active'>('all');
  const [selectedVideoForPreview, setSelectedVideoForPreview] = useState<VideoVariation | null>(null);

  // All vault videos (10 variations library) or passed variations
  const vaultVideos = allVariations && allVariations.length >= 10
    ? allVariations
    : variations.length >= 10
    ? variations
    : sample10Variations;

  // Active batch (usually the 4 active variations from Studio)
  const activeBatch = variations.length > 0 ? variations : sample10Variations.slice(0, 4);

  // Displayed videos based on user selection filter
  const displayedVideos = filterBatch === 'all' ? vaultVideos : activeBatch;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12151b] border border-[#1e242e] rounded-xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[#1e2532] text-[#00e599] flex items-center justify-center">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Creator Asset Vault
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18202c] text-[#00e599] font-mono border border-[#00e599]/30">
              Verified Biometrics
            </span>
          </div>
          <p className="text-xs text-[#78889b]">
            Persistent storage of your AI Digital Twins, ElevenLabs voice clones, and exported 1080p MP4 variations.
          </p>
        </div>

        {/* Tab Buttons (Rendered Videos first & active by default) */}
        <div className="flex rounded-lg overflow-hidden border border-[#202734] bg-[#0d1015]">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === 'videos' ? 'bg-[#00e599] text-black font-bold' : 'text-[#8e9cae] hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Rendered Videos ({vaultVideos.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === 'all' ? 'bg-[#00e599] text-black font-bold' : 'text-[#8e9cae] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Assets</span>
          </button>
          <button
            onClick={() => setActiveTab('twins')}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === 'twins' ? 'bg-[#00e599] text-black font-bold' : 'text-[#8e9cae] hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Digital Twins</span>
          </button>
          <button
            onClick={() => setActiveTab('voices')}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === 'voices' ? 'bg-[#00e599] text-black font-bold' : 'text-[#8e9cae] hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Clones</span>
          </button>
        </div>
      </div>

      {/* Rendered Videos Tab (DEFAULT) */}
      {(activeTab === 'videos' || activeTab === 'all') && (
        <div className="space-y-4">
          {/* Sub-header / Filter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#12151b] border border-[#1e242e] rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Filter Assets:</span>
              <div className="flex rounded-lg overflow-hidden border border-[#202734] bg-[#0d1015]">
                <button
                  onClick={() => setFilterBatch('all')}
                  className={`text-[11px] px-2.5 py-1 font-medium transition-colors ${
                    filterBatch === 'all'
                      ? 'bg-[#1e2533] text-[#00e599] font-bold'
                      : 'text-[#8e9cae] hover:text-white'
                  }`}
                >
                  All Rendered ({vaultVideos.length})
                </button>
                <button
                  onClick={() => setFilterBatch('active')}
                  className={`text-[11px] px-2.5 py-1 font-medium transition-colors ${
                    filterBatch === 'active'
                      ? 'bg-[#1e2533] text-[#00e599] font-bold'
                      : 'text-[#8e9cae] hover:text-white'
                  }`}
                >
                  Current Batch ({activeBatch.length})
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-[#718296] font-mono">
              <span>Format: 1080×1920 MP4</span>
              <span>•</span>
              <span className="text-[#00e599]">60 FPS • H.264</span>
            </div>
          </div>

          {/* Smaller Thumbnails Grid: 6 columns on xl, 5 on lg, 4 on md, 3 on sm, 2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-3.5">
            {displayedVideos.map((v) => (
              <div
                key={v.id}
                className="group bg-[#12151b] border border-[#1e242e] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#00e599]/50 hover:shadow-lg hover:shadow-[#00e599]/10 transition-all duration-200"
              >
                {/* Compact Thumbnail Container (aspect-[9/13]) */}
                <div
                  onClick={() => setSelectedVideoForPreview(v)}
                  className="relative aspect-[9/13] bg-black overflow-hidden cursor-pointer"
                >
                  <img
                    src={v.thumbnailUrl}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top-Left: Var # badge */}
                  <div className="absolute top-2 left-2 bg-black/85 text-[#00e599] font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#00e599]/30 shadow">
                    Var #{v.number}
                  </div>

                  {/* Top-Right: Retention score badge */}
                  <div className="absolute top-2 right-2 bg-black/80 text-[#38bdf8] font-bold text-[8.5px] px-1.5 py-0.5 rounded border border-[#38bdf8]/30 shadow flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-[#38bdf8]" />
                    <span>{v.retentionScore}%</span>
                  </div>

                  {/* Bottom-Right: Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/85 text-white/90 font-mono text-[8.5px] px-1.5 py-0.5 rounded shadow">
                    {v.durationFormatted}
                  </div>

                  {/* Hover Central Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-[#00e599] text-black flex items-center justify-center shadow-lg shadow-[#00e599]/50 group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info & Download Button */}
                <div className="p-2.5 bg-[#12151b] flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[11px] font-bold text-white truncate mb-0.5">
                      {v.hookType}
                    </p>
                    <p className="text-[9.5px] text-[#718296] line-clamp-1 mb-2.5 leading-snug">
                      "{v.hookText}"
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setSelectedVideoForPreview(v)}
                      title="Preview video"
                      className="px-2 py-1.5 rounded-lg bg-[#161a22] hover:bg-[#1f2532] text-[#8e9cae] hover:text-white text-[10px] font-semibold border border-[#202734] transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => alert(`Downloading ${v.title}.mp4`)}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-[#161a22] hover:bg-[#00e599]/15 text-[#00e599] text-[10.5px] font-semibold border border-[#00e599]/30 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Digital Twins */}
      {(activeTab === 'twins' || activeTab === 'all') && (
        <div className="space-y-3">
          {activeTab === 'all' && (
            <h3 className="text-xs font-bold text-[#8e9cae] uppercase tracking-wider">
              AI Digital Twins & Avatar Models
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 hover:border-[#28313f] transition-all max-w-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{sourceVideo.creatorName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30 font-mono">
                    ACTIVE TWIN
                  </span>
                </div>
                <span className="text-[11px] text-[#718296] font-mono">ID: {sourceVideo.avatarProfile.id}</span>
              </div>

              {/* Smaller thumbnail for twin */}
              <div className="relative aspect-video max-h-36 rounded-lg overflow-hidden bg-black mb-3 border border-[#202734]">
                <img
                  src={sourceVideo.thumbnailUrl}
                  alt="Twin"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-[radial-gradient(#00e599_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9.5px] text-[#00e599] font-mono border border-[#00e599]/30">
                  468 Facial Landmarks • {sourceVideo.avatarProfile.confidenceScore}% Precision
                </div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#181d26]">
                  <span className="text-[#8e9cae]">Motion Dynamics</span>
                  <span className="text-white font-medium">Head Tilts & Breathing</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#181d26]">
                  <span className="text-[#8e9cae]">Studio Preservation</span>
                  <span className="text-[#00e599] font-medium">100% (LivePortrait)</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#8e9cae]">Status</span>
                  <span className="text-[#00e599] font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Calibrated & Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Voice Clones */}
      {(activeTab === 'voices' || activeTab === 'all') && (
        <div className="space-y-3">
          {activeTab === 'all' && (
            <h3 className="text-xs font-bold text-[#8e9cae] uppercase tracking-wider">
              ElevenLabs Studio Voice Clones
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-4 hover:border-[#28313f] transition-all max-w-md">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-[#00e599]" />
                  <span className="text-xs font-bold text-white">Alex Thorne Voice Model</span>
                </div>
                <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30 font-mono">
                  ELEVENLABS HD
                </span>
              </div>

              <p className="text-[11px] text-[#7c8b9c] mb-3">
                Calibrated from 44.1kHz studio WAV. Replicates vocal fry, resonance, and breath control.
              </p>

              {/* Waveform */}
              <div className="flex items-end gap-1 h-12 bg-[#0d1015] p-2.5 rounded-lg border border-[#1f2633] mb-3">
                {[30, 60, 45, 80, 95, 65, 40, 85, 70, 50, 90, 100, 60, 40, 80, 35, 65, 85].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${
                        isPlayingVoice ? 'bg-[#00e599] animate-pulse' : 'bg-[#293444]'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  )
                )}
              </div>

              <button
                onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                className="w-full py-1.5 rounded-lg bg-[#18202c] hover:bg-[#202938] border border-[#00e599]/30 text-[11px] text-[#00e599] font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {isPlayingVoice ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                    <span>Playing Voice Sample...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-[#00e599]" />
                    <span>Listen to Voice Sample</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {selectedVideoForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#12151b] border border-[#222a38] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl space-y-3 p-4">
            <div className="flex items-center justify-between border-b border-[#1c222c] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#00e599] text-black">
                  Var #{selectedVideoForPreview.number}
                </span>
                <span className="text-xs font-bold text-white">
                  {selectedVideoForPreview.hookType}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideoForPreview(null)}
                className="text-[#718296] hover:text-white p-1 rounded-lg hover:bg-[#1a202c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-[9/14] bg-black rounded-xl overflow-hidden border border-[#222a38]">
              {selectedVideoForPreview.videoUrl ? (
                <video
                  src={selectedVideoForPreview.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={selectedVideoForPreview.thumbnailUrl}
                    alt={selectedVideoForPreview.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#00e599] text-black flex items-center justify-center mb-3 shadow-lg shadow-[#00e599]/40">
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                    <span className="text-xs font-bold text-white mb-1">
                      Rendered 1080p Video Preview
                    </span>
                    <span className="text-[10px] text-[#00e599] font-mono">
                      {selectedVideoForPreview.durationFormatted} • LatentSync Lip-Sync OK
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Script Snippet */}
            <div className="bg-[#0d1015] border border-[#1f2633] rounded-lg p-2.5 text-xs text-[#8e9cae]">
              <p className="text-[11px] font-bold text-white mb-1">Hook Script:</p>
              <p className="text-[10.5px] italic text-[#cbd5e1] leading-relaxed">
                "{selectedVideoForPreview.hookText}"
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedVideoForPreview(null)}
                className="flex-1 py-2 rounded-lg bg-[#161a22] hover:bg-[#1f2532] text-xs font-semibold text-white border border-[#222a38] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${selectedVideoForPreview.title}.mp4`);
                  setSelectedVideoForPreview(null);
                }}
                className="flex-1 py-2 rounded-lg bg-[#00e599] hover:bg-[#00ffaa] text-xs font-bold text-black flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Download MP4</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

