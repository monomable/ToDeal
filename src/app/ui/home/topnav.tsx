import Link from 'next/link';
import NavLinks2 from '@/src/app/ui/home/nav-links2';
import DealLogo from '@/src/app/ui/deal-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import SearchBar from '@/src/app/home/search/SearchBar';

export default function TopNav() {
  return (
    <div className="flex h-full flex-col md:flex-row">
      {/*<Link className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-60">
          <DealLogo />
        </div> 
      </Link>*/}
      <div>
        <SearchBar/>
        <div className="flex justify-between p-2 space-x-2">
          <NavLinks2 />
        </div>
      </div>
    </div>
  );
}
