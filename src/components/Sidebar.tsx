'use client';

import React, { useState } from 'react';
import {
  LayoutGrid,
  CalendarDays,
  FolderGit2,
  BarChart3,
  ChevronDown,
  Key,
  Flame,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';

export type NavView = 'studio' | 'calendar' | 'assets' | 'analytics';

interface SidebarProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  credits: number;
  onOpenSettings: () => void;
}

const navItems: {
  id: NavView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}[] = [
  { id: 'studio', label: 'Studio', icon: LayoutGrid, title: 'Studio' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, title: 'Calendar' },
  { id: 'assets', label: 'Assets', icon: FolderGit2, title: 'Assets' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, title: 'Analytics' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  credits,
  onOpenSettings,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <aside className="h-screen sticky top-0 bg-[#090b0e] border-r border-[#141820] w-60 flex flex-col justify-between select-none shrink-0 z-50">
      {/* Top Header & Brand (Podfloww Style with Bottom Border Line) */}
      <div>
        <div className="h-16 px-5 flex items-center gap-2.5 border-b border-[#1c212a] shrink-0">
          {/* Podfloww-inspired vibrant glowing emerald capsule logo */}
          <div className="flex items-center justify-center shrink-0">
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_10px_rgba(0,229,153,0.85)]"
            >
              <line x1="6" y1="1" x2="6" y2="3.5" stroke="#00e599" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="1.5" y="4" width="9" height="16.5" rx="4.5" fill="#00e599" />
            </svg>
          </div>
          <span className="text-[17px] font-bold text-white tracking-tight">10xPost</span>
        </div>

        {/* Navigation Links with CREATE section heading */}
        <nav className="px-3 pt-6 pb-2">
          {/* CREATE Section Heading */}
          <div className="px-3 mb-2 text-[11px] font-bold text-[#556578] uppercase tracking-wider">
            CREATE
          </div>

          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'border border-[#00e599]/60 bg-[#00e599]/10 text-white font-medium shadow-[0_0_10px_rgba(0,229,153,0.06)]'
                      : 'text-[#8492a3] hover:text-white hover:bg-[#121620] font-medium border border-transparent'
                  }`}
                  title={item.title}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-[#8492a3] group-hover:text-white'
                    }`}
                  />
                  <span className="tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom Profile & Credits (Podfloww Style) */}
      <div className="p-3 border-t border-[#141820] space-y-2">
        {/* Credits Indicator */}
        <div className="bg-[#10141c] border border-[#1e2533] rounded-xl px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#00e599]" />
            <span className="text-xs font-semibold text-white">{credits}</span>
            <span className="text-[11px] text-[#718296]">credits left</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-[11px] font-semibold text-[#00e599] hover:text-[#00ffaa] hover:underline"
          >
            Add +
          </button>
        </div>

        {/* User Account Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full p-2 rounded-xl hover:bg-[#121620] flex items-center justify-between transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-black border border-[#232b38] flex items-center justify-center shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Alex Thorne"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left leading-tight truncate">
                <p className="text-sm font-bold text-white truncate">Alex Thorne</p>
                <p className="text-[10px] text-[#00e599] font-mono">Pro Creator</p>
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#6c798d] shrink-0" />
          </button>

          {/* Profile Dropdown Popover */}
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#141822] border border-[#252e3d] rounded-xl shadow-2xl p-1.5 z-50">
              <button
                onClick={() => {
                  onOpenSettings();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full p-2 text-xs text-[#8e9cae] hover:text-white hover:bg-[#1c222e] rounded-lg flex items-center gap-2 text-left"
              >
                <Key className="w-3.5 h-3.5 text-[#00e599]" />
                <span>API Keys & Engine</span>
              </button>
              <button
                onClick={() => {
                  alert('Workspace settings');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full p-2 text-xs text-[#8e9cae] hover:text-white hover:bg-[#1c222e] rounded-lg flex items-center gap-2 text-left"
              >
                <Settings className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Workspace Settings</span>
              </button>
              <button
                onClick={() => {
                  alert('Billing & Subscription');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full p-2 text-xs text-[#8e9cae] hover:text-white hover:bg-[#1c222e] rounded-lg flex items-center gap-2 text-left"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Billing & Plans</span>
              </button>
              <div className="pt-1 mt-1 border-t border-[#1f2633]">
                <button
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="w-full p-2 text-xs text-red-400 hover:bg-red-400/10 rounded-lg flex items-center gap-2 text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
