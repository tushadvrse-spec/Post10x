'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, FolderKanban } from 'lucide-react';

interface ActiveProjectSelectorProps {
  onProjectChange?: (project: string) => void;
}

export const ActiveProjectSelector: React.FC<ActiveProjectSelectorProps> = ({
  onProjectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState('Alex Thorne (DOAC Podcast)');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const projects = [
    'Alex Thorne (DOAC Podcast)',
    'Tech Founders 10x Growth',
    'Personal Brand Daily Shorts',
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (project: string) => {
    setActiveProject(project);
    setIsOpen(false);
    if (onProjectChange) {
      onProjectChange(project);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Active Project Button in Top-Left Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#12161e] hover:bg-[#181d26] border border-[#202734] hover:border-[#2d3748] transition-all text-left shadow-sm"
      >
        <div className="w-5 h-5 rounded-md bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30 flex items-center justify-center text-[10px] font-bold shrink-0">
          <FolderKanban className="w-3 h-3 text-[#00e599]" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight">
            {activeProject}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#18202c] text-[#718296] font-mono border border-[#232f42] hidden sm:inline">
            Active Project
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#718296] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#12161e] border border-[#222a38] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <p className="px-2 py-1 text-[10px] font-bold text-[#627285] uppercase tracking-wider">
            Switch Project
          </p>

          <div className="space-y-1">
            {projects.map((proj) => (
              <button
                key={proj}
                onClick={() => handleSelect(proj)}
                className={`w-full p-2 text-xs rounded-lg flex items-center justify-between text-left transition-colors ${
                  activeProject === proj
                    ? 'bg-[#00e599]/15 text-[#00e599] font-bold'
                    : 'text-[#8e9cae] hover:bg-[#181d26] hover:text-white'
                }`}
              >
                <span className="truncate">{proj}</span>
                {activeProject === proj && <Check className="w-3.5 h-3.5 text-[#00e599] shrink-0" />}
              </button>
            ))}
          </div>

          <div className="pt-1 mt-1 border-t border-[#1c222c]">
            <button
              onClick={() => {
                alert('Create New Project modal');
                setIsOpen(false);
              }}
              className="w-full p-2 text-xs text-[#00e599] hover:bg-[#181d26] rounded-lg flex items-center gap-2 font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Project</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
