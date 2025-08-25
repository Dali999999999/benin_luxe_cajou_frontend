import React from 'react';

function ProfileInfoSkeleton() {
  return (
    <div className="bg-slate-100 border border-gray-200 p-6 rounded-lg animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-1/3 bg-slate-200 rounded"></div>
        <div className="h-10 w-24 bg-slate-200 rounded"></div>
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <div className="h-4 w-1/4 bg-slate-200 rounded mb-2"></div>
            <div className="h-8 w-full bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileInfoSkeleton;
