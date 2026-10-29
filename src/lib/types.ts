export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'upload';

export interface SourceVideo {
  id: string;
  title: string;
  url: string;
  duration: number; // in seconds
  durationFormatted: string;
  platform: Platform;
  thumbnailUrl: string;
  videoBlobUrl?: string;
  creatorName: string;
  creatorAvatarUrl: string;
  avatarProfile: {
    id: string;
    status: 'idle' | 'analyzing' | 'calibrating' | 'ready';
    faceMeshExtracted: boolean;
    confidenceScore: number;
    motionProfile: 'natural_hand_gestures' | 'expressive_head_turns' | 'calm_anchor';
    voiceCloneReady: boolean;
    voiceName: string;
  };
}

export type HookAngleType =
  | 'Contrarian Take'
  | 'Personal Story'
  | '3-Step Framework'
  | 'Cost of Inaction'
  | 'Industry Secret'
  | 'Rapid Listicle'
  | 'Question Led'
  | 'Myth Buster'
  | 'Urgent Warning'
  | 'Transformation';

export interface VideoCaptionWord {
  word: string;
  start: number;
  end: number;
  highlight?: boolean;
}

export interface VideoVariation {
  id: string;
  number: number;
  hookType: HookAngleType;
  title: string;
  hookText: string;
  fullScript: string;
  durationFormatted: string;
  thumbnailUrl: string;
  videoUrl?: string;
  status: 'idle' | 'generating' | 'ready';
  isSelected: boolean;
  retentionScore: number;
  subtitleStyle: 'Hormozi Neon' | 'Minimalist White' | 'Bold Yellow' | 'Karaoke Green';
  cutsCount: number;
  zoomInsCount: number;
}

export interface TargetChannel {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  name: string;
  username: string;
  avatarUrl: string;
  isConnected: boolean;
  isSelected: boolean;
}

export interface ScheduledPost {
  id: string;
  variationId: string;
  title: string;
  hookType: HookAngleType;
  platforms: ('instagram' | 'tiktok' | 'youtube')[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'queued' | 'publishing' | 'published';
  thumbnailUrl: string;
  captionExcerpt: string;
}

export interface SchedulerSettings {
  startDate: string;
  postingWindowStart: string;
  postingWindowEnd: string;
  dailyFrequency: number;
  gapHours: number;
  smartStagger: boolean;
}
