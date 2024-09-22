//import SideNav from '@/app/ui/home/sidenav';
import SearchBar from '@/app/ui/home/search-bar';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SearchBar />
    </div>
  );
}