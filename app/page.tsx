import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
 
export default function Page() {
  return (
    <main className="flex flex-col p-6 space-y-6 items-center">
      <div className="flex h-40 w-full shrink-0 items-end rounded-lg bg-rose-400 p-4 md:h-52">
        <AcmeLogo />
        {/* ... */}
      </div> 
      <Link className="flex h-[48px] w-[50%] grow items-center justify-center gap-2 rounded-md bg-gray-300 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-center md:p-2 md:px-3" href="/home">
        <div>Go Home</div>
      </Link>
    </main>
  );
}