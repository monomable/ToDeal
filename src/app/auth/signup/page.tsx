// page.tsx
"use client";

import React from "react";

export default function SignupPage() {
  return (
    <div className="w-80">
      <h2 className="text-2xl font-semibold">회원가입</h2>
      <p className="text-sm text-gray-600 mt-1 mb-6">정보를 입력해주세요</p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="닉네임"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded mt-2 hover:bg-red-600"
        >
          회원가입
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-700">
        이미 계정이 있으신가요?
        <a href="/auth2" className="text-black underline ml-1">
          로그인
        </a>
      </p>
    </div>
  );
}
