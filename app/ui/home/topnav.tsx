import Link from 'next/link';
import NavLinks2 from '@/app/ui/home/nav-links2';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import SearchBar from './search-bar';
import SearchPage from '@/app/home/search/page';

export default function TopNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:flex-row md:px-2 md:space-x-2">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#CDE8E5] p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-60">
          <AcmeLogo />
        </div>
      </Link>
      <div>
        <SearchPage />
        <div className="flex grow flex-row justify-between space-x-2 md:items-end md:p-2 md:flex-row">
          <NavLinks2 />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block ">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
