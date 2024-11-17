//import SideNav from '@/app/ui/home/sidenav';
import TopNav from '@/src/app/ui/home/topnav';
import DealLogo from '../ui/deal-logo';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:w-10/12 md:p-4 md:mx-auto md:border md:overflow-y-scroll"> {/* md:w-?/? 비율 설정해서 좌우 크기 조정 */}
      <div className="w-full flex-none">
        <TopNav />
      </div>
      <div className="flex-grow p-6 md:h-dvh md:p-4 md:mx-auto">{children}</div>
    </div>
  );
}