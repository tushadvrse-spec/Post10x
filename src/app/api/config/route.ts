import { NextResponse } from 'next/server';

export async function GET() {
  const maskKey = (key?: string) => {
    if (!key) return '';
    if (key.length <= 8) return '********';
    return `${key.slice(0, 6)}...${key.slice(-4)}`;
  };

  return NextResponse.json({
    success: true,
    data: {
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      geminiMasked: maskKey(process.env.GEMINI_API_KEY),
      elevenLabsConfigured: !!process.env.ELEVENLABS_API_KEY,
      elevenLabsMasked: maskKey(process.env.ELEVENLABS_API_KEY),
      falConfigured: !!process.env.FAL_KEY,
      falMasked: maskKey(process.env.FAL_KEY),
      groqConfigured: !!process.env.GROQ_API_KEY,
      groqMasked: maskKey(process.env.GROQ_API_KEY),
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { geminiKey, elevenLabsKey, falKey, groqKey } = body;

    if (geminiKey && !geminiKey.includes('...')) {
      process.env.GEMINI_API_KEY = geminiKey.trim();
    }
    if (elevenLabsKey && !elevenLabsKey.includes('...')) {
      process.env.ELEVENLABS_API_KEY = elevenLabsKey.trim();
    }
    if (falKey && !falKey.includes('...')) {
      process.env.FAL_KEY = falKey.trim();
    }
    if (groqKey && !groqKey.includes('...')) {
      process.env.GROQ_API_KEY = groqKey.trim();
    }

    return NextResponse.json({
      success: true,
      message: 'API Keys updated and active immediately.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
