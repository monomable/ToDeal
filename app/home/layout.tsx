//import SideNav from '@/app/ui/home/sidenav';
import TopNav from '@/app/ui/home/topnav';
import SearchBar from '@/app/ui/home/search-bar';
import AcmeLogo from '../ui/acme-logo';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <TopNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-4 md:mx-80">{children}</div>
      <SearchBar />
    </div>
  );
}