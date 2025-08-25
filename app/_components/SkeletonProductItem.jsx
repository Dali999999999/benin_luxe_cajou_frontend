import React from 'react';

function SkeletonProductItem() {
  return (
    <div className="h-full flex flex-col border border-slate-200 rounded-xl p-4 bg-white">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4 bg-slate-200 animate-pulse">
        {/* Placeholder for image */}
      </div>

      <div className="flex-grow flex flex-col items-start text-left mb-4">
        <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse mb-2"></div>
        <div className="h-8 w-1/2 bg-slate-200 rounded animate-pulse"></div>
      </div>

      <div className="h-[40px]">
        {/* Placeholder for button */}
      </div>
    </div>
  );
}

export default SkeletonProductItem;
