import React from 'react';

export function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/80 ${className}`}
      {...props}
    />
  );
}

export function ObituaryCardSkeleton({ viewMode = 'list' }: { viewMode?: 'grid' | 'list'; key?: React.Key }) {
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-5 space-y-4">
        <Skeleton className="w-full h-48 rounded-xl" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-1/3 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">
      <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full shrink-0" />
      <div className="flex-1 space-y-3 w-full">
        <Skeleton className="h-7 w-2/5 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-5 space-y-4">
      <Skeleton className="w-full h-56 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-6 space-y-4">
      <Skeleton className="w-full h-48 rounded-2xl" />
      <Skeleton className="h-4 w-1/4 rounded-md" />
      <Skeleton className="h-7 w-5/6 rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-4 w-1/3 rounded-md" />
    </div>
  );
}

export function ObituaryDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Skeleton className="w-40 h-40 rounded-full" />
        <Skeleton className="h-10 w-2/3 rounded-md" />
        <Skeleton className="h-5 w-1/3 rounded-md" />
      </div>
      <div className="bg-white p-8 rounded-3xl space-y-4 shadow-sm border border-gray-100">
        <Skeleton className="h-6 w-1/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-4/5 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>
    </div>
  );
}
