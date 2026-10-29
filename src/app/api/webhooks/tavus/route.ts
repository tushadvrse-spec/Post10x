import { NextResponse } from 'next/server';
import { updateVariation } from '@/lib/server/db';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { video_id, status, download_url, custom_id } = payload;

    console.log(`[Webhook Tavus] Received video callback: ${video_id}, status: ${status}`);

    if (custom_id && download_url && status === 'completed') {
      updateVariation(custom_id, {
        status: 'ready',
        videoUrl: download_url,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ received: false, error: error.message }, { status: 400 });
  }
}
