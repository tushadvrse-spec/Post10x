'use client';

import React, { useState } from 'react';
import { Sidebar, NavView } from '../components/Sidebar';
import { ActiveProjectSelector } from '../components/ActiveProjectSelector';
import { MetricsBar } from '../components/MetricsBar';
import { SourceVideoCard } from '../components/SourceVideoCard';
import { VariationSettingsCard } from '../components/VariationSettingsCard';
import { VariationsCarousel } from '../components/VariationsCarousel';
import { SchedulerSection } from '../components/SchedulerSection';
import { PostsQueueTable } from '../components/PostsQueueTable';
import { SocialCalendarView } from '../components/SocialCalendarView';
import { AssetVaultView } from '../components/AssetVaultView';
import { AnalyticsView } from '../components/AnalyticsView';
import { AvatarModal } from '../components/AvatarModal';
import { ScriptModal } from '../components/ScriptModal';
import { ApiKeysModal } from '../components/ApiKeysModal';
import {
  initialSourceVideo,
  sample10Variations,
  initialTargetChannels,
  initialScheduledPosts,
} from '../lib/mockData';
import { SourceVideo, VideoVariation, ScheduledPost, SchedulerSettings } from '../lib/types';
import confetti from 'canvas-confetti';
import { Film, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<NavView>('studio');
  const [credits, setCredits] = useState(84);
  const [sourceVideo, setSourceVideo] = useState<SourceVideo | null>(null);
  const [variationCount, setVariationCount] = useState(4);
  const [variations, setVariations] = useState<VideoVariation[]>(
    sample10Variations.slice(0, 4)
  );
  const [channels, setChannels] = useState(initialTargetChannels);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(
    initialScheduledPosts
  );

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Modals
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isApiKeysModalOpen, setIsApiKeysModalOpen] = useState(false);
  const [selectedScriptVariation, setSelectedScriptVariation] =
    useState<VideoVariation | null>(null);

  // Initial data fetch from Backend APIs
  React.useEffect(() => {
    async function loadInitialData() {
      try {
        const [projRes, schedRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/scheduler'),
        ]);
        if (projRes.ok) {
          const pData = await projRes.json();
          if (pData.data?.sourceVideo) setSourceVideo(pData.data.sourceVideo);
          if (pData.data?.credits !== undefined) setCredits(pData.data.credits);
        }
        if (schedRes.ok) {
          const sData = await schedRes.json();
          if (sData.data?.posts) setScheduledPosts(sData.data.posts);
          if (sData.data?.channels) setChannels(sData.data.channels);
        }
      } catch (err) {
        console.warn('Initial backend sync error:', err);
      }
    }
    loadInitialData();
  }, []);

  // Handle variation count change
  const handleCountChange = (count: number) => {
    setVariationCount(count);
  };

  // Handle Generate 10x Variations via Backend API
  const handleGenerate = async () => {
    const cost = variationCount * 2;
    if (credits < cost) {
      alert('Insufficient credits to generate this batch.');
      return;
    }

    setIsGenerating(true);
    setGenerationStep('Step 1/4: Deconstructing source pacing & cuts with Gemini 2.0...');

    const stepTimer1 = setTimeout(() => {
      setGenerationStep('Step 2/4: Calibrating 3D head geometry & voice clone...');
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setGenerationStep(`Step 3/4: Drafting ${variationCount} viral script angles...`);
    }, 2400);

    const stepTimer3 = setTimeout(() => {
      setGenerationStep('Step 4/4: Synthesizing Digital Twin video & auto-captions...');
    }, 3600);

    try {
      const res = await fetch('/api/projects/generate-variations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count: variationCount,
          coreTopic: sourceVideo?.title || 'Viral 10x Short-Form Video',
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.variations) {
        setVariations(data.data.variations);
        if (data.data.creditsRemaining !== undefined) {
          setCredits(data.data.creditsRemaining);
        }
      }
    } catch (e) {
      console.error('Generation API error:', e);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsGenerating(false);
      setGenerationStep('');

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00e599', '#38bdf8', '#a855f7'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  // Handle Variation selection toggle
  const handleToggleSelectVariation = (id: string) => {
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isSelected: !v.isSelected } : v))
    );
  };

  const handleSelectAllVariations = () => {
    setVariations((prev) => prev.map((v) => ({ ...v, isSelected: true })));
  };

  const handleDeselectAllVariations = () => {
    setVariations((prev) => prev.map((v) => ({ ...v, isSelected: false })));
  };

  // Handle Channel toggle
  const handleToggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSelected: !c.isSelected } : c))
    );
  };

  const handleSelectAllChannels = () => {
    setChannels((prev) => prev.map((c) => ({ ...c, isSelected: true })));
  };

  // Handle Schedule Posts via Backend API
  const handleSchedulePosts = async (settings: SchedulerSettings) => {
    const selectedVars = variations.filter((v) => v.isSelected);
    const selectedChans = channels.filter((c) => c.isSelected);

    if (selectedVars.length === 0 || selectedChans.length === 0) {
      alert('Please select at least 1 video variation and 1 target channel.');
      return;
    }

    try {
      const res = await fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variationIds: selectedVars.map((v) => v.id),
          channelIds: selectedChans.map((c) => c.id),
          settings,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.posts) {
        setScheduledPosts(data.data.posts);
      }
    } catch (err) {
      console.error('Schedule API error:', err);
    }
  };

  // Delete Post from Queue via Backend API
  const handleDeletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/scheduler/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success && data.data?.posts) {
        setScheduledPosts(data.data.posts);
      } else {
        setScheduledPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      setScheduledPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Update Source Video URL via Backend API
  const handleUpdateUrl = async (url: string) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.success && data.data?.sourceVideo) {
        setSourceVideo(data.data.sourceVideo);
      }
    } catch (e) {
      console.error('Project ingestion API error:', e);
    }
  };

  // Handle Local Video File Upload
  const handleUploadFile = async (file: File) => {
    try {
      const blobUrl = URL.createObjectURL(file);
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isUpload: true,
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.sourceVideo) {
        setSourceVideo({
          ...data.data.sourceVideo,
          videoBlobUrl: blobUrl,
        });
      } else {
        setSourceVideo({
          id: `vid_upload_${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: 'uploaded_file',
          videoBlobUrl: blobUrl,
          duration: 48,
          durationFormatted: '0:48 (Uploaded Master)',
          platform: 'upload',
          thumbnailUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          creatorName: 'Alex Thorne',
          creatorAvatarUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          avatarProfile: {
            id: `twin_upload_${Date.now()}`,
            status: 'ready',
            faceMeshExtracted: true,
            confidenceScore: 99.1,
            motionProfile: 'natural_hand_gestures',
            voiceCloneReady: true,
            voiceName: 'Alex Thorne (Cloned Studio HD)',
          },
        });
      }
    } catch (e) {
      console.error('File upload error:', e);
    }
  };

  // Save Script edits via Backend API
  const handleSaveScript = async (id: string, updatedScript: string) => {
    try {
      await fetch(`/api/variations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullScript: updatedScript,
          hookText: updatedScript.slice(0, 80) + '...',
        }),
      });

      setVariations((prev) =>
        prev.map((v) =>
          v.id === id
            ? {
                ...v,
                fullScript: updatedScript,
                hookText: updatedScript.slice(0, 80) + '...',
              }
            : v
        )
      );
    } catch (e) {
      console.error('Save script error:', e);
    }
    setSelectedScriptVariation(null);
  };

  const queuedCount = scheduledPosts.filter((p) => p.status === 'queued').length;
  const scheduledCount = scheduledPosts.length;
  const publishingCount = scheduledPosts.filter(
    (p) => p.status === 'publishing'
  ).length;
  const publishedCount = 18;

  return (
    <div className="flex min-h-screen bg-[#090b0e] text-[#f3f4f6]">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        credits={credits}
        onOpenSettings={() => setIsApiKeysModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Main Page Header */}
        <header className="h-16 border-b border-[#1c212a] bg-[#0c0e13]/60 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <ActiveProjectSelector />
          </div>
        </header>

        {/* View Switcher Main Container */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
          {/* VIEW 1: 10x Studio (Main Page) */}
          {activeView === 'studio' && (
            <>
              {/* Top Metric Status Bar (Matching Podfloww) */}
              <MetricsBar
                queuedCount={queuedCount}
                scheduledCount={scheduledCount}
                publishingCount={publishingCount}
                publishedCount={publishedCount}
              />

              {/* Section 1: Content & Source (Two-Column Layout) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#1e2532] text-[#00e599] flex items-center justify-center">
                      <Film className="w-3.5 h-3.5" />
                    </div>
                    <h2 className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
                      Content & Clips
                    </h2>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#18202c] text-[#788ca5] font-mono border border-[#232e3d]">
                      {variations.length} variations
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Card: Source Video & AI Twin Status */}
                  <SourceVideoCard
                    video={sourceVideo}
                    onUpdateUrl={handleUpdateUrl}
                    onUploadFile={handleUploadFile}
                    onInspectAvatar={() => setIsAvatarModalOpen(true)}
                  />

                  {/* Right Card: Variation Settings & Generation Controls */}
                  <VariationSettingsCard
                    variationCount={variationCount}
                    onCountChange={handleCountChange}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    generationStep={generationStep}
                  />
                </div>
              </div>

              {/* Section 2: Generated Variations (Single Horizontal Row Carousel) */}
              <VariationsCarousel
                variations={variations}
                onToggleSelect={handleToggleSelectVariation}
                onSelectAll={handleSelectAllVariations}
                onDeselectAll={handleDeselectAllVariations}
                onOpenScript={(v) => setSelectedScriptVariation(v)}
              />

              {/* Section 3: Social Multi-Post Scheduler (Matching Screenshots 2 & 3) */}
              <SchedulerSection
                variations={variations}
                channels={channels}
                onToggleChannel={handleToggleChannel}
                onSelectAllChannels={handleSelectAllChannels}
                onSchedulePosts={handleSchedulePosts}
              />

              {/* Section 4: Scheduled & Published Queue (Matching Screenshot 3) */}
              <PostsQueueTable
                posts={scheduledPosts}
                onDeletePost={handleDeletePost}
              />
            </>
          )}

          {/* VIEW 2: Social Calendar View */}
          {activeView === 'calendar' && (
            <SocialCalendarView posts={scheduledPosts} />
          )}

          {/* VIEW 3: Asset Vault View */}
          {activeView === 'assets' && (
            <AssetVaultView
              sourceVideo={sourceVideo || initialSourceVideo}
              variations={variations}
              allVariations={sample10Variations}
            />
          )}

          {/* VIEW 4: Reach & Analytics */}
          {activeView === 'analytics' && <AnalyticsView />}
        </main>
      </div>

      {/* Modals */}
      <AvatarModal
        video={sourceVideo || initialSourceVideo}
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />

      <ScriptModal
        variation={selectedScriptVariation}
        isOpen={!!selectedScriptVariation}
        onClose={() => setSelectedScriptVariation(null)}
        onSaveScript={handleSaveScript}
      />

      <ApiKeysModal
        isOpen={isApiKeysModalOpen}
        onClose={() => setIsApiKeysModalOpen(false)}
      />
    </div>
  );
}
