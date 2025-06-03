'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('❌ 올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('❌ 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await fetch('/server-api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('✅ 회원가입이 완료되었습니다.');
        router.push('/auth');
      } else {
        setError(data.error || '❌ 회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('❌ 서버 오류가 발생했습니다.');
    }
  };

  return (
    <main className="w-80">
      <Link href="/main" className="flex flex-col items-center justify-center cursor-pointer">
        <Image src="/todeal-logo.png" width={112} height={112} className="mb-4" sizes="auto" alt="todeal Logo" />
        <h2 className="text-2xl font-semibold mt-1 mb-6">회원가입</h2>
      </Link>

      <form className="space-y-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 font-bold bg-red-500 text-white rounded mt-2 hover:bg-red-600"
        >
          회원가입
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-700">
        이미 계정이 있으신가요?
        <a href="/auth" className="text-black underline ml-1">
          로그인
        </a>
      </p>
    </main>
  );
}
