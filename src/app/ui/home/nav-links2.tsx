import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    FireIcon
  } from '@heroicons/react/24/outline';
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: '메인', href: '/home', icon: HomeIcon },
    { name: '즐겨찾기', href: '/home/invoices', icon: HeartIcon },
    { name: '검색', href: '/home/search', icon: MagnifyingGlassIcon },
    { name: '최신핫딜', href: '/home/list', icon: FireIcon },
  ];
  
  export default function NavLinks2() {
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:font-bold md:flex-none md:justify-start md:p-2 md:px-3 md:w-[186px]">
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </a>
          );
        })}
      </>
    );
  }
  