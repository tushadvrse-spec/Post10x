import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Post10x — 1 Video In. 10x Reach Out.',
  description:
    'Turn 1 talking-head video into 10 unique viral variations with your AI Digital Twin, clone voice, and automated multi-channel scheduler.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090b0e] text-[#f3f4f6] antialiased selection:bg-[#00e599]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
