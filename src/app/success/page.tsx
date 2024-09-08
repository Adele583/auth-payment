'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [setStatus] = useState('Loading...');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful</h1>
      </div>
    </div>
  );
}
