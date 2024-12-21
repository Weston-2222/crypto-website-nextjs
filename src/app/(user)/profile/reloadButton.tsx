'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const ReloadButton = () => {
  const router = useRouter();
  const handleReload = useCallback(() => {
    router.refresh();
  }, [router]);
  useEffect(() => {
    handleReload();
  }, [handleReload]);

  return (
    <>
      <Button onClick={handleReload}>reload</Button>
    </>
  );
};

export default ReloadButton;
