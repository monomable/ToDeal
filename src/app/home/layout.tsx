//import SideNav from '@/app/ui/home/sidenav';
import TopNav from '@/ui/home/topnav';
import DealLogo from '../ui/deal-logo';
import SidePost from '../ui/home/side-post';
import LoginInfo from '../ui/home/login-info';
import Link from 'next/link';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen flex-col md:grid md:grid-cols-4 md:flex-row md:w-10/12 md:p-4 md:mx-auto md:border md:overflow-y-scroll"> {/* md:w-?/? 비율 설정해서 좌우 크기 조정 */}

      <div className='hidden md:my-8 md:block md:w-fit md:justify-self-end' >
        <Link className="" href="/">
          <DealLogo/>
        </Link>
        <div className='py-16 space-y-0'>
          <div className='hidden'><LoginInfo/></div>
          <SidePost/>
        </div>
      </div>

      <div className='flex flex-col md:p-4'>
        <div className='flex justify-center basis-1/4 md:hidden'>
          <Link className="" href="/">
            <DealLogo/>
          </Link>
        </div>
        <div className="flex-grow p-6 md:p-4 md:mx-auto">
          <TopNav/>
        </div>
        <div className="flex-grow p-6 h-dvh md:p-4 md:mx-auto md:w-max">{children}</div>
      </div>

    </div>
  );
}