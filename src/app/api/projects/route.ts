import { NextResponse } from 'next/server';
import { getDb, setSourceVideo } from '@/lib/server/db';
import { analyzeVideoWithGemini } from '@/lib/server/geminiService';
import { calibrateCreatorAvatar } from '@/lib/server/avatarService';
import { SourceVideo } from '@/lib/types';

export async function GET() {
  const db = getDb();
  return NextResponse.json({
    success: true,
    data: {
      credits: db.credits,
      sourceVideo: db.sourceVideo,
      variationsCount: db.variations.length,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, title, isUpload, fileName } = body;

    if (!url && !isUpload) {
      return NextResponse.json(
        { success: false, error: 'Video URL or video file upload is required' },
        { status: 400 }
      );
    }

    if (isUpload) {
      const cleanTitle = fileName
        ? fileName.replace(/\.[^/.]+$/, '')
        : 'Raw Master Recording';

      const newSourceVideo: SourceVideo = {
        id: `vid_upload_${Date.now()}`,
        title: cleanTitle,
        url: 'uploaded_file',
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
          voiceName: 'Alex Thorne (Cloned from Audio Track)',
        },
      };

      setSourceVideo(newSourceVideo);

      return NextResponse.json({
        success: true,
        data: {
          sourceVideo: newSourceVideo,
          analysis: {
            pacingScore: 94,
            keyHookFound: true,
            suggestedAngles: ['Contrarian Take', 'Quick 3-Step', 'Cost of Inaction'],
          },
        },
      });
    }

    // 1. Analyze video with Gemini
    const analysis = await analyzeVideoWithGemini(url);

    // 2. Calibrate Creator Digital Twin
    const twin = await calibrateCreatorAvatar(url, 'Alex Thorne');

    // 3. Detect Platform
    let platform: SourceVideo['platform'] = 'youtube';
    if (url.includes('instagram.com')) platform = 'instagram';
    else if (url.includes('tiktok.com')) platform = 'tiktok';

    const newSourceVideo: SourceVideo = {
      id: `vid_${Date.now()}`,
      title: title || "ChatGPT Whistleblower WARNS: 'You're Being LIED To'",
      url,
      duration: 52,
      durationFormatted: '0:52 (Original 1080p)',
      platform,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      creatorName: twin.creatorName,
      creatorAvatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      avatarProfile: {
        id: twin.replicaId,
        status: 'ready',
        faceMeshExtracted: true,
        confidenceScore: twin.confidenceScore,
        motionProfile: twin.motionProfile,
        voiceCloneReady: true,
        voiceName: `${twin.creatorName} (Cloned Studio HD)`,
      },
    };

    setSourceVideo(newSourceVideo);

    return NextResponse.json({
      success: true,
      data: {
        sourceVideo: newSourceVideo,
        analysis,
      },
    });
  } catch (error: any) {
    console.error('Error processing project ingestion:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to ingest video' },
      { status: 500 }
    );
  }
}
