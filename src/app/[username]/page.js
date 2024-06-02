// src/app/[username]/page.js
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();
  //const { username } = router.query;
  const username = "username";

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{username}</h1>
        {/* 사용자 정보 렌더링 */}
      </div>
    </div>
  );
}