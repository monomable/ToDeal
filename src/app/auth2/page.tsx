// page.tsx
"use client";

import React from "react";

export default function SignupPage() {
  return (
    <div className="w-80">
      <h2 className="text-2xl font-semibold">Create an account</h2>
      <p className="text-sm text-gray-600 mt-1 mb-6">Enter your details below</p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded mt-2 hover:bg-red-600"
        >
          Create Account
        </button>

        <button
          type="button"
          className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-700">
        Already have account?
        <a href="/login" className="text-black underline ml-1">
          Log in
        </a>
      </p>
    </div>
  );
}
