// eslint-disable-next-line @typescript-eslint/no-unused-vars
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NotificationPopup from './NotificationPopup';

interface Alert {
  id: number;
  product_name: string;
  is_read: number;
}

export default function NotificationButtonWrapper() {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [, setAlerts] = useState<Alert[]>([]);
  const [newAlert, setNewAlert] = useState<Alert | null>(null);
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [latestAlertId, setLatestAlertId] = useState<number | null>(null);

  // ✅ 주기적 알림 확인 (1분마다)
  useEffect(() => {
    const fetchAlerts = async () => {
        if (!session?.accessToken) return;

        try {
        const res = await fetch('/server-api/alerts', {
            headers: {
            Authorization: `Bearer ${session.accessToken}`,
            },
        });

        const data = await res.json();
        const newList = data.alerts || [];

        const unread = newList.some((alert: Alert) => alert.is_read === 0);
        setHasUnread(unread);

        // ✅ 새 알림인지 확인 (id가 기존보다 크고, 읽지 않은 경우)
        if (
            newList.length > 0 &&
            (!latestAlertId || newList[0].id > latestAlertId) &&
            newList[0].is_read === 0
        ) {
            setNewAlert(newList[0]);
            setShowNewAlert(true);
            setTimeout(() => setShowNewAlert(false), 5000);
            setLatestAlertId(newList[0].id); // 새 알림 기준 업데이트
        }

        setAlerts(newList);
        } catch (err) {
        console.error('❌ 알림 확인 실패:', err);
        }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 600);
    return () => clearInterval(interval);
    }, [session?.accessToken, latestAlertId]);

  return (
    <>
      {/* 🔔 종 버튼 */}
      <button
        onClick={() => setShowPopup(prev => !prev)}
        className="fixed bottom-6 right-6 bg-white shadow-md rounded-full p-3 text-xl z-50"
      >
        🔔
        {hasUnread && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </button>

      {/* 🧾 알림 팝업 */}
      {showPopup && <NotificationPopup onClose={() => setShowPopup(false)} />}

      {/* ⚡ 새 알림 미니 모달 */}
      {showNewAlert && newAlert && (
        <div className="fixed bottom-20 right-6 z-[60] bg-white border border-gray-300 shadow-lg rounded-md px-4 py-3 w-60 animate-slide-up-down">
          <p className="font-semibold text-gray-800">📢 새로운 알림!</p>
          <p className="text-sm text-gray-600 truncate">{newAlert.product_name}</p>
        </div>
      )}
    </>
  );
}
