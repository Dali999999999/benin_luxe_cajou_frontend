import React from 'react';

function OrderDetailSkeleton() {
  return (
    <div className="mt-4 p-4 border-t border-gray-200 bg-white animate-pulse">
      <div className="space-y-4">
        {/* Order Tracking Timeline */}
        <div>
          <div className="h-6 w-1/3 bg-slate-200 rounded mb-2"></div>
          <div className="space-y-3">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-4 h-4 bg-slate-200 rounded-full mr-2"></div>
                <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Ordered Items */}
        <div>
          <div className="h-6 w-1/3 bg-slate-200 rounded mb-2"></div>
          <div className="space-y-3">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-200 rounded-md"></div>
                <div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded mb-1"></div>
                  <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <div className="h-6 w-1/3 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-slate-200 rounded mb-1"></div>
          <div className="h-4 w-full bg-slate-200 rounded mb-1"></div>
          <div className="h-4 w-full bg-slate-200 rounded"></div>
        </div>

        {/* Payment Summary */}
        <div>
          <div className="h-6 w-1/3 bg-slate-200 rounded mb-2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex justify-between">
                <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
                <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-2">
              <div className="h-6 w-1/4 bg-slate-200 rounded"></div>
              <div className="h-6 w-1/4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailSkeleton;
