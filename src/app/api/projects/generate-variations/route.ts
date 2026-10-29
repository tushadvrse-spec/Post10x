import { NextResponse } from 'next/server';
import { getDb, updateCredits, setVariations } from '@/lib/server/db';
import { generateVariationsWithGemini } from '@/lib/server/geminiService';
import { synthesizeSpeechWithElevenLabs } from '@/lib/server/elevenLabsService';
import { getWordTimestampsFromGroq } from '@/lib/server/groqService';
import { renderVideoWithFal } from '@/lib/server/falService';
import { VideoVariation } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const count = Math.min(Math.max(Number(body.count) || 4, 2), 10);
    const db = getDb();
    const coreTopic =
      body.coreTopic ||
      (db.sourceVideo ? db.sourceVideo.title : null) ||
      'AI productivity and short-form video multiplication';

    const cost = count * 2;

    if (db.credits < cost) {
      return NextResponse.json(
        {
          success: false,
          error: `Insufficient credits. Need ${cost} credits, but you have ${db.credits}.`,
        },
        { status: 400 }
      );
    }

    console.log(`[Pipeline] 1/4: Generating ${count} script angles with Gemini 2.0 Flash...`);
    const generatedScripts = await generateVariationsWithGemini(coreTopic, count);

    const thumbnails = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    ];

    console.log(`[Pipeline] 2/4: Synthesizing speech with ElevenLabs & Word Timestamps...`);
    // Process variations in parallel with voice & video synthesis
    const variationPromises = generatedScripts.map(async (item, idx) => {
      // 1. Synthesize audio with ElevenLabs
      const speech = await synthesizeSpeechWithElevenLabs(item.fullScript);

      // 2. Transcribe with Groq for word-level captions if audio is present
      if (speech.audioUrl && speech.audioUrl.startsWith('http')) {
        await getWordTimestampsFromGroq(speech.audioUrl);
      }

      // 3. Render photorealistic video with Fal.ai (LatentSync / LivePortrait)
      const sourceUrl = db.sourceVideo?.url || 'https://youtube.com/shorts/dQw4w9WgXcQ';
      const videoResult = await renderVideoWithFal(
        sourceUrl,
        speech.audioUrl || sourceUrl,
        'latentsync'
      );

      return {
        id: `var_${Date.now()}_${idx + 1}`,
        number: item.number,
        hookType: item.hookType,
        title: item.title,
        hookText: item.hookText,
        fullScript: item.fullScript,
        durationFormatted: item.durationFormatted,
        thumbnailUrl: thumbnails[idx % thumbnails.length],
        videoUrl: videoResult.videoUrl || thumbnails[idx % thumbnails.length],
        status: 'ready' as const,
        isSelected: idx < 2,
        retentionScore: item.retentionScore,
        subtitleStyle: item.subtitleStyle,
        cutsCount: item.cutsCount,
        zoomInsCount: item.zoomInsCount,
      };
    });

    const newVariations = await Promise.all(variationPromises);

    // Deduct credits and update DB
    updateCredits(-cost);
    setVariations(newVariations);

    console.log(`[Pipeline] Success! Synthesized ${newVariations.length} video variations.`);

    return NextResponse.json({
      success: true,
      data: {
        variations: newVariations,
        creditsRemaining: getDb().credits,
        cost,
      },
    });
  } catch (error: any) {
    console.error('Error generating variations in pipeline:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}
