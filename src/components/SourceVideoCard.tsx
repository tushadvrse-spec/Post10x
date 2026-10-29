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
              ? 'Select Source'
              : video.platform === 'upload'
              ? 'Uploaded Master'
              : 'Original Master'}
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
              <span>Upload Video</span>
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
              <span>Add Video Link</span>
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
                    <p className="text-xs font-bold text-white">Ingesting Raw Video</p>
                    <p className="text-[11px] text-[#00e599] font-mono">{processingStatus}</p>
                  </div>
                  <div className="w-48 h-1.5 bg-[#18202c] rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00b377] to-[#00e599] animate-pulse w-3/4" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#18212e] to-[#111721] border border-[#273448] flex items-center justify-center mb-3 shadow-lg">
                    <Upload className="w-5 h-5 text-[#00e599]" />
                  </div>

                  <p className="text-xs font-bold text-white mb-1">
                    Drop your raw video here, or{' '}
                    <span className="text-[#00e599] underline underline-offset-2">browse files</span>
                  </p>
                  <p className="text-[11px] text-[#718296] max-w-xs mb-3">
                    Supports MP4, MOV, WebM • 9:16 vertical or 16:9 widescreen (up to 500MB)
                  </p>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161c26] border border-[#243042] text-[11px] font-semibold text-[#8ea0b5] hover:text-white transition-colors">
                    <FileVideo className="w-3.5 h-3.5 text-[#00e599]" />
                    Select Video from Computer
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
                    <p className="text-xs font-bold text-white">Downloading & Analyzing</p>
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
                      Paste Instagram Reel, TikTok, or YouTube Shorts link:
                    </label>

                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-[#5e6b7c]" />
                      <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://instagram.com/reel/... or youtube.com/shorts/..."
                        className="w-full bg-[#0d1015] border border-[#222936] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#505d6e] focus:outline-none focus:border-[#00e599] transition-colors"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-[#65768a]">Supported: IG Reels, TikTok, YT Shorts</span>
                      <button
                        type="button"
                        onClick={handleSampleUrl}
                        className="text-[#00e599] hover:underline font-medium"
                      >
                        ⚡ Use Sample DOAC Video
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
        /* STATE 2: LOADED VIDEO PREVIEW (Shown after upload or link) */
        <div className="space-y-4 flex-1 flex flex-col justify-between">
          {/* Source Video Preview Screen */}
          <div className="relative rounded-lg overflow-hidden border border-[#1f2633] bg-black group">
            <div className="aspect-video w-full relative">
              {video.videoBlobUrl ? (
                <video
                  src={video.videoBlobUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={video.thumbnailUrl}
                />
              ) : (
                <>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? 'opacity-80' : 'opacity-90'
                    }`}
                  />

                  {/* Centered Play Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#00e599] hover:bg-[#00ffaa] text-black flex items-center justify-center shadow-lg shadow-[#00e599]/30 hover:scale-105 transition-transform"
                  >
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </button>
                </>
              )}

              {/* Video Metadata Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-2 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                  {video.platform === 'youtube'
                    ? 'DOAC / Master'
                    : video.platform === 'upload'
                    ? 'Uploaded Master'
                    : video.platform}
                </span>
              </div>

              {/* Bottom Video Title Banner (if not playing local video) */}
              {!video.videoBlobUrl && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 pointer-events-none">
                  <h3 className="text-sm font-bold text-white line-clamp-1 mb-0.5">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-[#93a2b5] flex items-center gap-1.5">
                    <span>{video.durationFormatted}</span>
                    <span>•</span>
                    <span className="text-[#00e599]">Original 1080p Master</span>
                  </p>
                </div>
              )}
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
