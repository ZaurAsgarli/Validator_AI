import React from 'react';

export interface UserCardProps {
  username: string;
  platform: string;
  subreddit: string;
  score: number;
  url: string;
  reason: string;
}

export function UserCard({
  username,
  platform,
  subreddit,
  score,
  url,
  reason,
}: UserCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-zinc-200 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-900 group-hover:text-teal-700 transition-colors">
              u/{username}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium">
              {platform}
            </span>
          </div>
          <span className="text-sm text-teal-700 font-medium mt-1">
            r/{subreddit}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg border border-teal-100">
          <span className="text-xs font-semibold uppercase tracking-wider mb-0.5">Score</span>
          <span className="text-lg font-bold leading-none">{score}</span>
        </div>
      </div>
      
      <p className="text-zinc-600 text-sm leading-relaxed flex-grow">
        "{reason}"
      </p>
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200 group"
      >
        View Post
        <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}
