import NavLinks2 from '@/ui/home/nav-links2';

export default function TopNav() {
  return (
    <div className="flex h-full flex-col md:flex-row">
      {/*<Link className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-60">
          <DealLogo />
        </div> 
      </Link>*/}
      <div>
        <div className="flex justify-between p-2 space-x-2">
          <NavLinks2 />
        </div>
      </div>
    </div>
  );
}
