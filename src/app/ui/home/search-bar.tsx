import { BeakerIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  return (
    <div>
        <form>
            <input />
            <ul>
                <li>
                    <BeakerIcon className="object-cover w-10" />
                    <div className='inline left-2'>
                        플레이스테이션 5
                    </div>
                </li>
                <li>
                    <BeakerIcon className="object-cover w-10" />
                    <div className='inline left-2'>
                        XBOX 360
                    </div>
                </li>
            </ul>
        </form>
    </div>
  );
}
