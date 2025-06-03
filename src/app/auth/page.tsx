'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import LoginGoogle from '../components/LoginGoogle';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/main');
    } else {
      setError('❌ 로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <main className="w-80">
      <Link href="/main" className="flex flex-col items-center justify-center cursor-pointer">
        <Image src="/todeal-logo.png" width={112} height={112} className="mb-4" sizes="auto" alt="todeal Logo" />
        <h2 className="text-2xl font-semibold mt-1 mb-6">로그인</h2>
      </Link>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 font-bold bg-red-500 text-white rounded mt-2 hover:bg-red-600"
        >
          로그인
        </button>
      </form>

      <div className='mt-4'>
        <LoginGoogle />
      </div>

      <p className="text-sm text-center mt-6 text-gray-700">
        아직 계정이 없으신가요?
        <a href="/auth/signup" className="text-black underline ml-1">
          회원가입
        </a>
      </p>
    </main>
  );
}
