'use client';
import 'client-only';
import { useEffect, useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/themeToggle';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IconCategory,
  IconChartBarPopular,
  IconCoinBitcoin,
  IconUserBolt,
} from '@tabler/icons-react';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const links = [
  {
    label: '市值排行',
    href: '/',
    icon: (
      <IconChartBarPopular className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: '分類',
    href: '/category',
    icon: (
      <IconCategory className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
];

const MySidebar = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/');
    }
  }, [session.status, router]);
  const Logo = () => {
    return (
      <Link
        onClick={() => setOpen(false)}
        href='/'
        className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
      >
        <IconCoinBitcoin className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='font-medium text-black dark:text-white whitespace-pre'
        >
          Crypto Infomation Website
        </motion.span>
      </Link>
    );
  };
  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody
        className='justify-between gap-10'
        mobileWebsiteTitle={<Logo />}
      >
        <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          <Logo />

          <div className='mt-8 flex flex-col gap-2'>
            {links.map((link, idx) => (
              <div onClick={() => setOpen(false)} key={idx}>
                <SidebarLink key={idx} link={link} />
              </div>
            ))}
            {session.status === 'authenticated' && (
              <div onClick={() => setOpen(false)}>
                <SidebarLink
                  link={{
                    label: '個人頁面',
                    href: '/profile',
                    icon: (
                      <IconUserBolt className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
                    ),
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex justify-center p-4'>
            {session.status === 'unauthenticated' ? (
              <Button
                onClick={() => {
                  router.push('/login');
                  setOpen(false);
                }}
              >
                登入
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  await signOut();
                  setOpen(false);
                }}
              >
                登出
              </Button>
            )}
          </div>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default MySidebar;
