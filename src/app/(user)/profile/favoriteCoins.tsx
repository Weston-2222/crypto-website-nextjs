'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const FavoriteCoins = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    handleReload();
  }, []);
  const handleReload = () => {
    router.refresh();
  };
  return (
    <>
      <button onClick={handleReload}>reload</button>
      {children}
    </>
  );
};

export default FavoriteCoins;
