'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import NotificationPopup from './NotificationPopup';

export default function NotificationButtonWrapper() {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  if (!session?.user?.email) return null;

  return (
    <>
      <button
        onClick={() => setShowPopup(prev => !prev)}
        className="fixed bottom-6 right-6 bg-white shadow-md rounded-full p-3 text-xl"
      >
        🔔
      </button>

      {showPopup && (
        <NotificationPopup
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
