//import { GlobeAltIcon } from '@heroicons/react/24/outline';
//import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { notoSansKR } from '@/ui/fonts';

export default function DealLogo() {
  return (
    <div
      className={`${notoSansKR.className} flex flex-col items-start leading-none text-primary-400 md:pr-[64px]`}
    >
      <p className="text-[80px]">:Deal</p>
    </div>
  );
}
