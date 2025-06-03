'use client';

import { useEffect, useState } from 'react';
import KeywordModal from './KeywordModal';
import { useSession } from 'next-auth/react';

interface Alert {
  id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  keyword_matched: string;
  created_at: string;
  is_read: number; // ✅ 읽음 상태
}

export default function NotificationPopup({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showKeywordModal, setShowKeywordModal] = useState(false);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchAlerts = async () => {
      try {
        const res = await fetch('/server-api/alerts', {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error('❌ 알림 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [session?.accessToken]);

  const markAsRead = async (alertId: number) => {
    await fetch(`/server-api/alerts/${alertId}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, is_read: 1 } : a))
    );
  };

  const deleteAlert = async (alertId: number) => {
    await fetch(`/server-api/alerts/${alertId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  return (
    <>
      <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white rounded-xl shadow-lg border p-4 z-50">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">🔔 알림함</h2>
          <div className="flex gap-2">
            <button onClick={() => setShowKeywordModal(true)} title="키워드 설정">⚙️</button>
            <button onClick={onClose} title="닫기">✖️</button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        ) : alerts.length === 0 ? (
          <p className="text-gray-400 text-sm">도착한 알림이 없습니다.</p>
        ) : (
          <ul className="space-y-2 overflow-y-auto max-h-56 pr-1">
            {alerts.map(alert => (
              <li
                key={alert.id}
                onClick={async () => {
                  if (alert.is_read === 0) await markAsRead(alert.id);
                  window.location.href = `/post/view/${alert.product_id}`;
                }}
                className={`relative cursor-pointer border rounded p-2 transition ${
                  alert.is_read ? 'bg-gray-100 text-gray-500' : 'hover:bg-gray-50'
                }`}
              >
                <p className="font-medium">{alert.product_name}</p>
                <p className="text-sm">{alert.product_price.toLocaleString()}원</p>
                <p className="text-xs text-blue-500">매칭 키워드: {alert.keyword_matched}</p>

                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteAlert(alert.id);
                  }}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  title="삭제"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showKeywordModal && (
        <KeywordModal onClose={() => setShowKeywordModal(false)} />
      )}
    </>
  );
}
