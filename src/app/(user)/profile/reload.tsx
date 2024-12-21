'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const Reload = () => {
  const router = useRouter();
  const handleReload = useCallback(() => {
    router.refresh();
  }, [router]);
  useEffect(() => {
    handleReload();
  }, [handleReload]);

  return <></>;
};

export default Reload;
