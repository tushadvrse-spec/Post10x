'use client';

import React from 'react';
import { Sparkles, Key, Bell, Flame } from 'lucide-react';

interface HeaderProps {
  credits: number;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ credits, onOpenSettings }) => {
  return (
    <header className="border-b border-[#1c212a] bg-[#0c0e13]/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between w-full">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00b377] to-[#00e599] flex items-center justify-center shadow-lg shadow-[#00e599]/20">
          <span className="font-extrabold text-black text-lg tracking-tighter">10x</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              10xPost
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00e599]/15 text-[#00e599] font-medium border border-[#00e599]/30">
                Studio
              </span>
            </h1>
          </div>
          <p className="text-[11px] text-[#8e98a8] leading-none">
            1 Video In • 10x Reach Out • AI Digital Twin
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3.5">
        {/* Credits Counter */}
        <div className="flex items-center gap-2 bg-[#141820] border border-[#222936] hover:border-[#00e599]/40 transition-colors px-3 py-1.5 rounded-lg text-xs font-medium">
          <span className="flex h-2 w-2 rounded-full bg-[#00e599] animate-pulse" />
          <Flame className="w-3.5 h-3.5 text-[#00e599]" />
          <span className="text-white font-semibold">{credits}</span>
          <span className="text-[#8e98a8]">credits left</span>
        </div>

        {/* API Settings Button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 text-xs bg-[#141820] text-[#a4b1c4] hover:text-white hover:bg-[#1a202c] border border-[#222936] px-3 py-1.5 rounded-lg transition-all"
        >
          <Key className="w-3.5 h-3.5 text-[#00e599]" />
          <span>API Keys</span>
        </button>

        {/* Notification bell */}
        <button className="p-2 rounded-lg bg-[#141820] border border-[#222936] text-[#8e98a8] hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00e599]" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#222936]">
          <div className="w-8 h-8 rounded-full ring-1 ring-[#00e599]/50 overflow-hidden bg-[#1e2532]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Alex Thorne"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block text-left text-xs leading-tight">
            <p className="font-semibold text-white">Alex Thorne</p>
            <p className="text-[10px] text-[#00e599] font-mono">Pro Creator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
