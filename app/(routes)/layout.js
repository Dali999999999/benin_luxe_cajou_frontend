"use client"

import { Suspense } from 'react';

export default function RoutesLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      {children}
    </Suspense>
  );
}
