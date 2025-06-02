// auth/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import LoginGoogle from "../components/LoginGoogle";

export default function HomePage() {
  return (
    <main className="w-80">
      <Link href="/main" className="flex flex-col items-center justify-center cursor-pointer">
        <Image src="/todeal-logo.png" width={112} height={112} className="mb-4" sizes="auto" alt="todeal Logo" />
        <h2 className="text-2xl font-semibold mt-1 mb-6">로그인</h2>
      </Link>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="이메일"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />

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
