'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <IconSun className='h-4 w-4' />
      ) : (
        <IconMoon className='h-4 w-4' />
      )}
    </Button>
  );
}
