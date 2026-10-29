import {
  SourceVideo,
  VideoVariation,
  TargetChannel,
  ScheduledPost,
} from '../types';
import {
  initialSourceVideo,
  sample10Variations,
  initialTargetChannels,
  initialScheduledPosts,
} from '../mockData';

// In-Memory Data Store with Persistent Structure
interface DatabaseState {
  credits: number;
  sourceVideo: SourceVideo | null;
  variations: VideoVariation[];
  channels: TargetChannel[];
  scheduledPosts: ScheduledPost[];
}

const globalForDb = global as unknown as { dbState: DatabaseState };

export const db: DatabaseState =
  globalForDb.dbState || {
    credits: 84,
    sourceVideo: null,
    variations: sample10Variations.slice(0, 4),
    channels: initialTargetChannels,
    scheduledPosts: initialScheduledPosts,
  };

if (process.env.NODE_ENV !== 'production') {
  globalForDb.dbState = db;
}

export const getDb = () => db;

export const updateCredits = (amount: number) => {
  db.credits = Math.max(0, db.credits + amount);
  return db.credits;
};

export const setSourceVideo = (video: SourceVideo | null) => {
  db.sourceVideo = video;
  return db.sourceVideo;
};

export const setVariations = (variations: VideoVariation[]) => {
  db.variations = variations;
  return db.variations;
};

export const updateVariation = (id: string, updates: Partial<VideoVariation>) => {
  const index = db.variations.findIndex((v) => v.id === id);
  if (index !== -1) {
    db.variations[index] = { ...db.variations[index], ...updates };
    return db.variations[index];
  }
  const sample = sample10Variations.find((v) => v.id === id);
  if (sample) {
    const updated = { ...sample, ...updates };
    db.variations.push(updated);
    return updated;
  }
  return null;
};

export const addScheduledPosts = (posts: ScheduledPost[]) => {
  db.scheduledPosts = [...posts, ...db.scheduledPosts];
  return db.scheduledPosts;
};

export const removeScheduledPost = (id: string) => {
  db.scheduledPosts = db.scheduledPosts.filter((p) => p.id !== id);
  return db.scheduledPosts;
};

export const updateChannel = (id: string, updates: Partial<TargetChannel>) => {
  const index = db.channels.findIndex((c) => c.id === id);
  if (index !== -1) {
    db.channels[index] = { ...db.channels[index], ...updates };
    return db.channels[index];
  }
  return null;
};
