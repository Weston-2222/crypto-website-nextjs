'use client';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import MySidebar from './mySidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-TW' className='dark'>
      <body>
        <SessionProvider>
          <ThemeProvider attribute='class' defaultTheme='dark'>
            <div
              className={cn(
                'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen'
              )}
              style={{ overflowY: 'auto' }}
            >
              <MySidebar />
              <Dashboard>{children}</Dashboard>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-1 '>
      <div className='overflow-y-auto p-2 md:p-5 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full '>
        <div className='gap-2'>{children}</div>
        <div className='flex gap-2 flex-1'></div>
      </div>
    </div>
  );
};
