// app/lib/fetchWithAuth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function fetchProtectedAPI(url: string) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("로그인 정보 없음");
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: { revalidate: 0 }, // 캐시 안 함
  });

  if (!res.ok) throw new Error("API 호출 실패");

  return res.json();
}
