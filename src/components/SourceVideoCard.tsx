'use client';

import React, { useState, useRef } from 'react';
import { SourceVideo } from '../lib/types';
import {
  Play,
  RotateCw,
  Link as LinkIcon,
  Upload,
  CheckCircle,
  Eye,
  Mic,
  Cpu,
  FileVideo,
  Sparkles,
  Loader2,
  Smartphone,
  Layers,
} from 'lucide-react';

interface SourceVideoCardProps {
  video: SourceVideo | null;
  onUpdateUrl: (url: string) => Promise<void> | void;
  onUploadFile: (file: File) => Promise<void> | void;
  onInspectAvatar: () => void;
}

export const SourceVideoCard: React.FC<SourceVideoCardProps> = ({
  video,
  onUpdateUrl,
  onUploadFile,
  onInspectAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>('upload');
  const [isChanging, setIsChanging] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [showSafeZones, setShowSafeZones] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await processSelectedFile(files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = async (file: File) => {
    setIsProcessing(true);
    setProcessingStatus('Reading video frames and audio stream...');
    const t1 = setTimeout(() => {
      setProcessingStatus('Calibrating 3D head geometry & facial mesh...');
    }, 1200);
    const t2 = setTimeout(() => {
      setProcessingStatus('Cloning speaker voice profile (44.1kHz)...');
    }, 2400);

    try {
      await onUploadFile(file);
      setIsChanging(false);
    } catch (err) {
      console.error('File upload error:', err);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsProcessing(true);
    setProcessingStatus('Fetching video from platform link...');
    const t1 = setTimeout(() => {
      setProcessingStatus('Deconstructing pacing, cuts & transcripts...');
    }, 1200);
    const t2 = setTimeout(() => {
      setProcessingStatus('Calibrating Digital Twin & voice clone...');
    }, 2400);

    try {
      await onUpdateUrl(inputUrl.trim());
      setIsChanging(false);
      setInputUrl('');
    } catch (err) {
      console.error('URL ingestion error:', err);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  const handleSampleUrl = () => {
    setInputUrl('https://youtube.com/shorts/dQw4w9WgXcQ');
  };

  const isInputState = !video || isChanging;

  return (
    <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 flex flex-col justify-between hover:border-[#28313f] transition-all h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
            Source Video
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
              isInputState
                ? 'bg-[#18202c] text-[#00e599] border-[#00e599]/30'
                : 'bg-[#18202c] text-[#7991b0] border-[#232f42]'
            }`}
          >
            {isInputState
              ? 'Select 9:16 Short'
              : video.platform === 'upload'
              ? 'Uploaded 9:16 Short'
              : '9:16 Short Master'}
          </span>
        </div>

        {video && (
          <button
            onClick={() => setIsChanging(!isChanging)}
            className="flex items-center gap-1.5 text-xs text-[#8a96a8] hover:text-white bg-[#171b23] hover:bg-[#202632] border border-[#222936] px-2.5 py-1 rounded-lg transition-colors"
          >
            <RotateCw className="w-3 h-3 text-[#00e599]" />
            <span>{isChanging ? 'Cancel' : 'Change Video'}</span>
          </button>
        )}
      </div>

      {/* STATE 1: INITIAL OR CHANGING STATE (Upload or Link) */}
      {isInputState ? (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          {/* Option Selector Tabs */}
          <div className="flex items-center p-1 bg-[#0c0e13] rounded-xl border border-[#1c222c]">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-[#161b24] text-[#00e599] shadow-sm border border-[#263142]'
                  : 'text-[#7e8b9b] hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload 9:16 Video</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'link'
                  ? 'bg-[#161b24] text-[#00e599] shadow-sm border border-[#263142]'
                  : 'text-[#7e8b9b] hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Add Short Link</span>
            </button>
          </div>

          {/* TAB 1: UPLOAD VIDEO FILE */}
          {activeTab === 'upload' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isProcessing && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[220px] ${
                isDragging
                  ? 'border-[#00e599] bg-[#00e599]/10 scale-[1.01]'
                  : 'border-[#232d3d] bg-[#0c0f14] hover:border-[#00e599]/60 hover:bg-[#0f131a]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleFileChange}
                className="hidden"
              />

              {isProcessing ? (
                <div className="space-y-3 py-4">
                  <div className="w-12 h-12 rounded-full bg-[#00e599]/15 border border-[#00e599]/40 flex items-center justify-center mx-auto text-[#00e599] animate-spin">
                    <Loader2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white">Ingesting 9:16 Short Video</p>
                    <p className="text-[11px] text-[#00e599] font-mono">{processingStatus}</p>
                  </div>
                  <div className="w-48 h-1.5 bg-[#18202c] rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00b377] to-[#00e599] animate-pulse w-3/4" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#18212e] to-[#111721] border border-[#273448] flex items-center justify-center mb-3 shadow-lg">
                    <Smartphone className="w-5 h-5 text-[#00e599]" />
                  </div>

                  <p className="text-xs font-bold text-white mb-1">
                    Drop your 9:16 vertical video here, or{' '}
                    <span className="text-[#00e599] underline underline-offset-2">browse files</span>
                  </p>
                  <p className="text-[11px] text-[#718296] max-w-xs mb-3">
                    Exclusively for 9:16 vertical short-form (Reels, TikTok, Shorts • 15s to 90s)
                  </p>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161c26] border border-[#243042] text-[11px] font-semibold text-[#8ea0b5] hover:text-white transition-colors">
                    <FileVideo className="w-3.5 h-3.5 text-[#00e599]" />
                    Select 9:16 Video from Computer
                  </span>
                </>
              )}
            </div>
          )}

          {/* TAB 2: ADD VIDEO LINK */}
          {activeTab === 'link' && (
            <form onSubmit={handleSubmitUrl} className="space-y-4 py-2 min-h-[220px] flex flex-col justify-between">
              {isProcessing ? (
                <div className="space-y-3 py-10 text-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-[#00e599]/15 border border-[#00e599]/40 flex items-center justify-center mx-auto text-[#00e599] animate-spin">
                    <Loader2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white">Analyzing 9:16 Short Link</p>
                    <p className="text-[11px] text-[#00e599] font-mono">{processingStatus}</p>
                  </div>
                  <div className="w-48 h-1.5 bg-[#18202c] rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00b377] to-[#00e599] animate-pulse w-3/4" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#8e98a8]">
                      Paste 9:16 Instagram Reel, TikTok, or YouTube Shorts link:
                    </label>

                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-[#5e6b7c]" />
                      <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://instagram.com/reel/... or tiktok.com/@user/video/... or youtube.com/shorts/..."
                        className="w-full bg-[#0d1015] border border-[#222936] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#505d6e] focus:outline-none focus:border-[#00e599] transition-colors"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-[#65768a]">Supported: IG Reels, TikTok, YT Shorts (9:16)</span>
                      <button
                        type="button"
                        onClick={handleSampleUrl}
                        className="text-[#00e599] hover:underline font-medium"
                      >
                        ⚡ Use Sample 9:16 Short
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!inputUrl.trim() || isProcessing}
                    className="w-full py-2.5 rounded-xl bg-[#00e599] hover:bg-[#00c784] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00e599]/20 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Fetch & Deconstruct Video</span>
                  </button>
                </>
              )}
            </form>
          )}

          {/* Quick Tip Footer */}
          <div className="bg-[#0e1218] border border-[#1d2532] rounded-lg p-2.5 flex items-center gap-2 text-[11px] text-[#718296]">
            <Cpu className="w-3.5 h-3.5 text-[#00e599] shrink-0" />
            <span>AI automatically clones your voice and matches 3D head geometry upon upload.</span>
          </div>
        </div>
      ) : (
        /* STATE 2: LOADED VIDEO PREVIEW (Dedicated 9:16 Short-Form Format) */
        <div className="space-y-4 flex-1 flex flex-col justify-between">
          {/* 9:16 Video Stage Canvas */}
          <div className="relative rounded-xl overflow-hidden border border-[#1f2638] bg-[#080a0e] flex flex-col items-center justify-center p-3 sm:p-4 group">
            {/* Stage Controls Header: Format pill & Safe-zones toggle */}
            <div className="w-full max-w-[260px] flex items-center justify-between mb-2.5 px-0.5">
              <span className="text-[10px] font-mono font-bold text-[#00e599] bg-[#00e599]/10 px-2 py-0.5 rounded border border-[#00e599]/25 flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-[#00e599]" />
                9:16 VERTICAL
              </span>

              <button
                type="button"
                onClick={() => setShowSafeZones(!showSafeZones)}
                className={`text-[10px] px-2 py-0.5 rounded border transition-colors flex items-center gap-1 font-mono ${
                  showSafeZones
                    ? 'bg-[#00e599]/20 text-[#00e599] border-[#00e599]/40'
                    : 'bg-[#151a24] text-[#718296] hover:text-white border-[#222b3b]'
                }`}
                title="Toggle UI Safe Zones for TikTok & Instagram Reels"
              >
                <Layers className="w-3 h-3" />
                <span>Safe Zones: {showSafeZones ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* 9:16 Vertical Smartphone Screen */}
            <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#242e3f] shadow-2xl bg-black group/player">
              {video.videoBlobUrl ? (
                <video
                  src={video.videoBlobUrl}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                  poster={video.thumbnailUrl}
                />
              ) : (
                <>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? 'opacity-80' : 'opacity-95'
                    }`}
                  />

                  {/* Centered Play Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#00e599] hover:bg-[#00ffaa] text-black flex items-center justify-center shadow-lg shadow-[#00e599]/35 hover:scale-105 transition-all"
                  >
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </button>
                </>
              )}

              {/* TikTok / Reels UI Safe Zones Overlay */}
              {showSafeZones && (
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-2.5">
                  <div className="border border-dashed border-[#00e599]/50 rounded py-1 px-1.5 text-[8.5px] text-[#00e599] bg-black/60 text-center font-mono">
                    Top Bar Safe Zone
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <div className="border border-dashed border-[#38bdf8]/50 rounded p-1 text-[8px] text-[#38bdf8] bg-black/60 font-mono">
                      Feed Center
                    </div>
                    {/* Simulated Right-Rail Action Icons Safe Area */}
                    <div className="border border-dashed border-red-400/60 rounded p-1.5 text-[8px] text-red-300 bg-black/60 font-mono text-right space-y-1">
                      <div>♥ Likes</div>
                      <div>💬 Comments</div>
                      <div>↗ Share</div>
                    </div>
                  </div>
                  <div className="border border-dashed border-amber-400/60 rounded p-1.5 text-[8px] text-amber-300 bg-black/60 text-center font-mono">
                    Bottom Captions & Audio Safe Zone
                  </div>
                </div>
              )}

              {/* Top-Right Resolution Badge */}
              <div className="absolute top-2.5 right-2.5 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-[9px] font-mono text-white/90 px-1.5 py-0.5 rounded border border-white/10">
                  1080×1920
                </span>
              </div>

              {/* Bottom Video Title Banner (if not playing local video) */}
              {!video.videoBlobUrl && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-3 pt-8 pointer-events-none">
                  <h3 className="text-xs font-bold text-white line-clamp-1 mb-0.5">
                    {video.title}
                  </h3>
                  <p className="text-[10px] text-[#93a2b5] flex items-center justify-between">
                    <span className="text-[#00e599] font-mono">{video.durationFormatted}</span>
                    <span className="font-mono">Short-Form Master</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 9:16 Short-Form Specs Row */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] bg-[#0c0f14] border border-[#1c222c] rounded-lg p-2 font-mono">
            <div>
              <span className="text-[#5e7085] block text-[9px] uppercase">Format</span>
              <span className="text-[#00e599] font-bold">9:16 Vertical</span>
            </div>
            <div>
              <span className="text-[#5e7085] block text-[9px] uppercase">Resolution</span>
              <span className="text-white font-medium">1080 × 1920</span>
            </div>
            <div>
              <span className="text-[#5e7085] block text-[9px] uppercase">Length</span>
              <span className="text-white font-medium">{video.durationFormatted}</span>
            </div>
            <div>
              <span className="text-[#5e7085] block text-[9px] uppercase">Target</span>
              <span className="text-[#38bdf8] font-medium">Reels/Shorts</span>
            </div>
          </div>

          {/* AI Digital Twin & Voice Clone Status Module */}
          <div className="bg-[#0d1015] border border-[#1c222c] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#00e599]" />
                <span className="text-xs font-semibold text-white">AI Creator Profile</span>
              </div>

              <button
                onClick={onInspectAvatar}
                className="text-[10px] text-[#00e599] hover:text-[#00ffaa] flex items-center gap-1 font-medium transition-colors"
              >
                <Eye className="w-3 h-3" />
                <span>Inspect 3D Twin</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {/* Digital Twin Face Mesh */}
              <div className="bg-[#13171f] p-2 rounded border border-[#1d232e] flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#00e599]/15 border border-[#00e599]/30 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00e599]" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-white truncate">Face & Mesh Synced</p>
                  <p className="text-[10px] text-[#818f9f]">
                    {video.avatarProfile.confidenceScore}% Landmark Match
                  </p>
                </div>
              </div>

              {/* Voice Clone */}
              <div className="bg-[#13171f] p-2 rounded border border-[#1d232e] flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#00e599]/15 border border-[#00e599]/30 flex items-center justify-center shrink-0">
                  <Mic className="w-3.5 h-3.5 text-[#00e599]" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-white truncate">Voice Cloned</p>
                  <p className="text-[10px] text-[#818f9f]">44.1kHz Studio HD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
