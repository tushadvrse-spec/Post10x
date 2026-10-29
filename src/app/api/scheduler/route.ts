import { NextResponse } from 'next/server';
import { getDb, addScheduledPosts } from '@/lib/server/db';
import { sample10Variations } from '@/lib/mockData';
import { ScheduledPost, SchedulerSettings } from '@/lib/types';

export async function GET() {
  const db = getDb();
  return NextResponse.json({
    success: true,
    data: {
      posts: db.scheduledPosts,
      channels: db.channels,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { variationIds, channelIds, settings } = body as {
      variationIds: string[];
      channelIds: string[];
      settings: SchedulerSettings;
    };

    const db = getDb();

    const allVariations = [...(db.variations || []), ...sample10Variations];
    const selectedVariations = allVariations.filter((v, idx, arr) =>
      variationIds.includes(v.id) && arr.findIndex((x) => x.id === v.id) === idx
    );
    const selectedChannels = db.channels.filter((c) =>
      channelIds.includes(c.id)
    );

    if (selectedVariations.length === 0 || selectedChannels.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Must select at least 1 video and 1 channel.' },
        { status: 400 }
      );
    }

    const startHour = parseInt(settings.postingWindowStart.split(':')[0], 10) || 11;
    const gap = settings.gapHours || 3;

    const newPosts: ScheduledPost[] = selectedVariations.map((v, idx) => {
      const postHour = (startHour + idx * gap) % 24;
      const formattedHour = `${postHour.toString().padStart(2, '0')}:00`;

      return {
        id: `post_${Date.now()}_${idx + 1}`,
        variationId: v.id,
        title: v.title,
        hookType: v.hookType,
        platforms: selectedChannels.map((c) => c.platform),
        scheduledDate: settings.startDate || '26/10/2026',
        scheduledTime: formattedHour,
        status: 'queued',
        thumbnailUrl: v.thumbnailUrl,
        captionExcerpt: v.hookText,
      };
    });

    addScheduledPosts(newPosts);

    return NextResponse.json({
      success: true,
      data: {
        scheduledCount: newPosts.length,
        posts: getDb().scheduledPosts,
      },
    });
  } catch (error: any) {
    console.error('Error scheduling posts:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Scheduling failed' },
      { status: 500 }
    );
  }
}
