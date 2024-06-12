// src/app/[username]/page.js
"use client";

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserBox from '@/components/userBox';
import UserContext from '@/context/UserContext';

export default function UserPage() {
  const router = useRouter();
  const username = useContext(UserContext)?.user?.username;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{username}</h1>
        <UserBox />
        <p>내가 쓴 글 버튼</p> {/* /myarticle*/}
      </div>
    </div>
  );
}