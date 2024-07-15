"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section 
      className={`custom-scrollbar leftsidebar transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className='flex w-full flex-1 flex-col gap-6 px-2'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"} ${isExpanded ? 'justify-start px-4' : 'justify-center'}`}
            >
              <div className={`${isExpanded ? 'mr-4' : 'mr-0'} flex items-center justify-center`}>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
              </div>

              {isExpanded && (
                <p className='text-light-1 transition-opacity duration-300'>{link.label}</p>
              )}
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-2'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className={`flex cursor-pointer gap-4 p-4 ${isExpanded ? 'justify-start px-4' : 'justify-center'}`}>
              <div className={`${isExpanded ? 'mr-4' : 'mr-0'} flex items-center justify-center`}>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>

              {isExpanded && (
                <p className='text-light-1 transition-opacity duration-300'>Logout</p>
              )}
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;