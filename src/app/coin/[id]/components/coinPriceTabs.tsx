'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TradingViewWidget from '@/dynamic/dynamicTradingViewWidget';

import MyPricesCharts from '@/components/myPricesCharts';
import { useState } from 'react';

const CoinPriceTabs = ({
  coinId,
  symbol,
}: {
  coinId: string;
  symbol: string;
}) => {
  const [type, setType] = useState<'price' | 'market_caps' | 'TradingView'>(
    'price'
  );
  return (
    <Tabs
      defaultValue='prices'
      className='w-full'
      onValueChange={(value) => {
        console.log(value);
        setType(value as 'price' | 'market_caps' | 'TradingView');
      }}
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

      <TabsContent value='TradingView' className='h-[600px] w-full'>
        <TradingViewWidget symbol={symbol} />
      </TabsContent>

      {type === 'TradingView' ? null : (
        <MyPricesCharts coinId={coinId} type={type} />
      )}
    </Tabs>
  );
};

export default CoinPriceTabs;
