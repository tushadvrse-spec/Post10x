'use client';

import React, { useState } from 'react';
import { ScheduledPost } from '../lib/types';
import {
  Search,
  Clock,
  CheckCircle2,
  PlayCircle,
  Trash2,
  ExternalLink,
  Layers,
  Filter,
} from 'lucide-react';

interface PostsQueueTableProps {
  posts: ScheduledPost[];
  onDeletePost: (id: string) => void;
}

export const PostsQueueTable: React.FC<PostsQueueTableProps> = ({
  posts,
  onDeletePost,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.hookType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.captionExcerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || post.status === statusFilter;

    const matchesPlatform =
      platformFilter === 'all' ||
      post.platforms.includes(platformFilter as any);

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <div className="bg-[#12151b] border border-[#1e242e] rounded-xl p-5 hover:border-[#28313f] transition-colors mb-12">
      {/* Table Header & Search/Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#1b222d] flex items-center justify-center text-[#00e599]">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold tracking-wider text-[#7e8b9b] uppercase">
            Scheduled & Published Posts
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18202c] text-[#788ca5] font-mono border border-[#232e3d]">
            {filteredPosts.length} items
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#526173]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts or captions..."
              className="w-full bg-[#0d1015] border border-[#1e242e] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#505d6e] focus:outline-none focus:border-[#00e599]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0d1015] border border-[#1e242e] text-xs text-[#8e9cae] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00e599]"
          >
            <option value="all">All Statuses</option>
            <option value="queued">Queued</option>
            <option value="publishing">Publishing</option>
            <option value="published">Published</option>
          </select>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-[#0d1015] border border-[#1e242e] text-xs text-[#8e9cae] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00e599]"
          >
            <option value="all">All Platforms</option>
            <option value="youtube">YouTube Shorts</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      {/* Posts List / Table */}
      {filteredPosts.length === 0 ? (
        <div className="py-14 text-center rounded-lg border border-dashed border-[#1f2633] bg-[#0d1015]">
          <Clock className="w-8 h-8 text-[#4a586b] mx-auto mb-2 opacity-50" />
          <p className="text-xs font-semibold text-[#8e98a8]">
            No posts found in queue
          </p>
          <p className="text-[11px] text-[#556375] mt-1">
            Use the scheduler above to generate publishing jobs for your 10x variations.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#0d1015] border border-[#1b212b] hover:border-[#27303e] rounded-lg p-3.5 flex items-center justify-between gap-4 transition-colors"
            >
              {/* Left Video Thumbnail & Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-16 rounded overflow-hidden bg-black shrink-0 border border-[#232b38]">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#18202c] text-[#00e599] border border-[#00e599]/30">
                      {post.hookType}
                    </span>
                    <span className="text-xs font-bold text-white truncate">
                      {post.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#718296] line-clamp-1">
                    "{post.captionExcerpt}"
                  </p>
                </div>
              </div>

              {/* Center Schedule Time & Target Platforms */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#38bdf8]" />
                    <span>{post.scheduledTime}</span>
                  </p>
                  <p className="text-[10px] text-[#6d7e93] font-mono">
                    {post.scheduledDate}
                  </p>
                </div>

                {/* Platforms Icons */}
                <div className="flex items-center gap-1.5">
                  {post.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#171c24] text-[#a4b2c4] uppercase font-semibold border border-[#222a38]"
                    >
                      {p === 'youtube' ? 'YT' : p === 'instagram' ? 'IG' : 'TT'}
                    </span>
                  ))}
                </div>

                {/* Status Badge */}
                <div>
                  {post.status === 'queued' && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#eab308]/15 text-[#eab308] border border-[#eab308]/30 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Queued</span>
                    </span>
                  )}
                  {post.status === 'publishing' && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#a855f7]/15 text-[#a855f7] border border-[#a855f7]/30 font-medium flex items-center gap-1">
                      <PlayCircle className="w-3 h-3 animate-spin" />
                      <span>Publishing</span>
                    </span>
                  )}
                  {post.status === 'published' && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Published</span>
                    </span>
                  )}
                </div>

                {/* Action button: delete */}
                <button
                  onClick={() => onDeletePost(post.id)}
                  title="Remove from queue"
                  className="p-2 text-[#68788c] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
