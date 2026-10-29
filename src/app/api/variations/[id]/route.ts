import { NextResponse } from 'next/server';
import { getDb, updateVariation } from '@/lib/server/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const variation = getDb().variations.find((v) => v.id === id);

  if (!variation) {
    return NextResponse.json(
      { success: false, error: 'Variation not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: variation });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = updateVariation(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Variation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
