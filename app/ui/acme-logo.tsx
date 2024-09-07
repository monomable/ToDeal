//import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col items-start leading-none text-white`}
    >
      <BuildingLibraryIcon className="h-12 w-12" />
      <p className="text-[44px]">SweatDeal</p>
    </div>
  );
}
