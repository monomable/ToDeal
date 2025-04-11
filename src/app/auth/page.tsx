import UserInfo from "../components/UserInfo";
import CallAPIButton from "../components/CallAPIButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Next.js + Google OAuth Demo</h1>
      <UserInfo />
      <CallAPIButton />
    </main>
  );
}
