'use client';

import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
export const navbar = [
  {
    name: 'Home',
    link: '/',
  },
  {
    // name: name.provinsi,
    name: 'Provinsi',
    link: '/provinsi',
  },
  {
    // name: name.kabupaten,
    name: 'kabupaten',
    link: '/kabupaten',
  },
  {
    // name: name.kecamatan,
    name: 'Kecamatan',
    link: '/kecamatan',
  },
];
const NavLink = () => {
  const pathname = usePathname();
  const arrsplit = pathname!.split('/');
  const baseRoute = '/' + arrsplit[1];
  return (
    <ul className={'justify-center flex-grow hidden sm:flex'}>
      {navbar.map(nav => (
        <li key={nav.link}>
          <Link
            className={cn(
              'text-base px-3 py-1.5 mx-2 rounded-sm w-fit font-semibold items-start flex justify-center',
              pathname && baseRoute === nav.link ? 'text-sky-600' : ''
            )}
            href={nav.link}
          >
            {nav.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const SideNavLink = () => {
  const pathname = usePathname();
  const r = useRouter();
  return (
    <>
      {navbar.map(nav => (
        <li key={nav.link}>
          <SheetClose
            className={cn(
              'text-base px-3 py-1.5 mx-2 rounded-sm w-fit font-semibold items-start flex hover:text-green-800',
              pathname === nav.link ? 'text-green-600' : ''
            )}
            onClick={() => r.push(nav.link)}
          >
            {nav.name}
          </SheetClose>
        </li>
      ))}
    </>
  );
};

export { NavLink, SideNavLink };
