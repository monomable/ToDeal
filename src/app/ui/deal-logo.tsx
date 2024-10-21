//import { GlobeAltIcon } from '@heroicons/react/24/outline';
//import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { ubuntu } from '@/src/app/ui/fonts';

export default function DealLogo() {
  return (
    <div
      className={`${ubuntu.className} flex flex-col items-start leading-none text-black`}
    >
      <p className="text-[60px]">:Deal</p>
    </div>
  );
}
