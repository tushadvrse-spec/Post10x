import { NextResponse } from 'next/server';
import { removeScheduledPost, getDb } from '@/lib/server/db';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  removeScheduledPost(id);

  return NextResponse.json({
    success: true,
    data: {
      posts: getDb().scheduledPosts,
    },
  });
}
