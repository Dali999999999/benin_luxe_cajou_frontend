"use client"

import { Suspense } from 'react';

export default function AuthLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      {children}
    </Suspense>
  );
}
