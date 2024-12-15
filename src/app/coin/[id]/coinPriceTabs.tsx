'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TradingViewWidget from '@/dynamic/dynamicTradingViewWidget';

import PricesCharts from '@/components/pricesCharts';
import { useState } from 'react';

const CoinPriceTabs = ({
  coinId,
  symbol,
}: {
  coinId: string;
  symbol: string;
}) => {
  const [type, setType] = useState<'price' | 'market_caps'>('price');
  return (
    <Tabs
      defaultValue='prices'
      className='w-full h-full'
      onValueChange={(value) => setType(value as 'price' | 'market_caps')}
    >
      <TabsList>
        <TabsTrigger value='price' className='hover:text-primary'>
          Prices
        </TabsTrigger>
        <TabsTrigger value='market_caps' className='hover:text-primary'>
          Market Caps
        </TabsTrigger>
        <TabsTrigger value='TradingView' className='hover:text-primary'>
          TradingView
        </TabsTrigger>
      </TabsList>

      <TabsContent value='TradingView' className='h-full w-full'>
        <TradingViewWidget symbol={symbol} />
      </TabsContent>

      {/* <TabsContent value={type} className='h-full w-full'> */}
      <PricesCharts coinId={coinId} type={type} />
      {/* </TabsContent> */}
      {/* 
      <TabsContent value='market_caps' className='h-full w-full'>
        <p>Change your password here.</p>
      </TabsContent> */}
    </Tabs>
  );
};

export default CoinPriceTabs;
