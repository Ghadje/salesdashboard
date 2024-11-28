'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { menu } from '@/data/menu';
import Header from './header';
import { useAuth } from '@/lib/authContext';
import { LogOut } from 'lucide-react';

const SidebarComponent = (props: any) => {
  const pathname = usePathname().split('/')[1];
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log('Logging out...');
    await logout(); // Ensure the logout function handles user session properly
    router.push('/'); // Redirect to the login or home page after logout
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex bg-card">
          {/* Sidebar Section */}
          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 bottom-0 z-40 xl:w-[345px] w-[200px] h-full overflow-y-auto flex flex-col justify-between bg-card"
            aria-label="Sidebar"
          >
            <div className="flex justify-left items-center w-full py-[40px] px-[40px]">
              <Link href="/" className="flex gap-x-[14px] ">
                <Image
                  src="/images/irisLogo.svg"
                  alt="iris-logo"
                  height={150}
                  width={150}
                />
              </Link>
            </div>
            <div className="h-full 2xl:px-[46px] px-[23px] lg:pb-4 pb-2 bg-card flex flex-col justify-between">
              <ul className="space-y-2 grown font-medium">
                {menu?.map((o) => {
                  return (
                    <li key={o.title}>
                      <Link
                        href={o.url}
                        className={`flex items-center 2xl:px-6 lg:px-3 px-1 2xl:py-4 lg:py-2 py-1
                          group ${
                            pathname === o.pathname
                              ? 'text-activeText rounded-lg bg-primary dark:hover:bg-gray-700'
                              : 'text-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                      >
                        <o.icon
                          className={`${
                            pathname === o.pathname
                              ? 'text-activeText'
                              : 'text-text'
                          }, mr-2 h-4 w-4`}
                        />
                        <span className="2xl:ms-3 lg:ms-2 ms-1 capitalize xl:text-lg lg:text-base text-sm leading-[27px]">
                          {o.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="space-y-2 font-medium">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center 2xl:px-6 lg:px-3 px-1 2xl:py-4 lg:py-2 py-1 group text-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="text-text mr-2 h-4 w-4" />
                  <span className="2xl:ms-3 lg:ms-2 ms-1 capitalize xl:text-lg lg:text-base text-sm leading-[27px]">
                    Se déconnecter
                  </span>
                </button>
              </div>
            </div>
          </aside>

          {/* Header Section */}
          <Header />
        </div>

        {/* Main Section */}
        <div className="p-8 xl:ml-[345px] ml-[200px] 2xl:mt-[120px] mt-[150px] bg-background min-h-[calc(100vh-130px)] h-auto w-auto">
          {props.pages}
        </div>
      </div>

      {/* Mobile View */}
      <Header />
      <div className="md:hidden block p-4 bg-background pt-[120px] min-h-screen h-screen">
        {props.pages}
      </div>
    </div>
  );
};

export default SidebarComponent;
