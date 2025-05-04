// layout.tsx
import React from "react";

export const metadata = {
  title: "Create Account",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
