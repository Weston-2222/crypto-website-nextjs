'use client';

import Loading from '@/components/loading';
import dynamic from 'next/dynamic';

// 動態加載 TradingViewWidget 並禁用 SSR
const TradingViewWidget = dynamic(
  () => import(/*TradingViewWidget*/ '@/components/tradingviewChat'),
  { ssr: false, loading: () => <Loading /> }
);

export default TradingViewWidget;
