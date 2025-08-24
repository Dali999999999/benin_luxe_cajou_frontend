import React from 'react';

function OrderListSkeleton() {
  return (
    <div className="bg-slate-100 border border-gray-200 p-6 rounded-lg animate-pulse">
      <div className="h-6 w-1/3 bg-slate-200 rounded mb-4"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border p-4 rounded-lg flex justify-between items-center bg-white">
            <div>
              <div className="h-5 w-2/3 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
            </div>
            <div className="text-right">
              <div className="h-5 w-1/3 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderListSkeleton;
