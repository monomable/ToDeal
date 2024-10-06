import Link from 'next/link';
import NavLinks2 from '@/app/ui/home/nav-links2';
import DealLogo from '@/app/ui/deal-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import SearchBar from './search-bar';
import SearchPage from '@/app/home/search/page';

export default function TopNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:flex-row md:px-2 md:space-x-2">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#CDE8E5] p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-60">
          <DealLogo />
        </div>
      </Link>
      <div>
        <SearchPage />
        <div className="flex grow flex-row justify-between space-x-2 md:items-end md:p-2 md:flex-row">
          <NavLinks2 />
        </div>
      </div>
    </div>
  );
}
