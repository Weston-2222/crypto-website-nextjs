'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CoinMarketChartApiResponse } from '@/types/api/coingecko/coinMarketChart';
import { Days } from '@/app/api/price_charts/[id]/[days]/route';

import Loading from './loading';
import { formatPriceUnit } from '@/lib/utils';

const chartConfig = {
  price: {
    label: '價格',
    color: 'hsl(var(--chart-1))',
  },
  time: {
    label: 'Time',
    color: 'hsl(var(--chart-2))',
  },
  volumes: {
    label: 'Volumes',
    color: 'hsl(var(--chart-3))',
  },
  market_caps: {
    label: 'Market Caps',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

type PricesChartsType = {
  time: string;
  price: number;
  volumes: number;
  market_caps: number;
};
const PricesCharts = ({
  coinId,
  type,
}: {
  coinId: string;
  type: 'price' | 'market_caps';
}) => {
  //時間
  const [period, setPeriod] = useState('1_days');

  //chart的數據
  const [coinPricesChartData, setCoinPricesChartData] = useState<
    PricesChartsType[] | undefined
  >(undefined);
  //is loading
  const [isLoading, setIsLoading] = useState(false);

  //api
  const getCoinPricesChartData = async (
    value: string
  ): Promise<PricesChartsType[]> => {
    const data = await fetch(`/api/price_charts/${coinId}/${value}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const coinPricesChartData: CoinMarketChartApiResponse = await data.json();
    return coinPricesChartData.prices.map((price, index) => ({
      // time: new Date(price[0]).toLocaleDateString(),
      price: price[1],
      time: `${new Date(price[0]).toLocaleDateString()} ${new Date(
        price[0]
      ).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      volumes: coinPricesChartData.total_volumes[index][1],
      market_caps: coinPricesChartData.market_caps[index][1],
    }));
  };

  const changePeriod = async (value: string) => {
    if (!(value in Days)) return;
    setIsLoading(true);
    const pricesCharts = await getCoinPricesChartData(value);
    setPeriod(value);
    setCoinPricesChartData(pricesCharts);
    setIsLoading(false);
  };

  useEffect(() => {
    changePeriod(period);
  }, []);
  const daysList = [
    {
      value: '1_days',
      label: '1 Day',
    },
    {
      value: '7_days',
      label: '7 Days',
    },
    {
      value: '30_days',
      label: '30 Days',
    },
    {
      value: '90_days',
      label: '90 Days',
    },
    {
      value: '180_days',
      label: '180 Days',
    },
    {
      value: '365_days',
      label: '365 Days',
    },
  ];

  return (
    <>
      <Tabs
        defaultValue={daysList[0].value}
        className='w-full h-full'
        onValueChange={changePeriod}
      >
        <TabsList>
          {daysList.map((day) => (
            <TabsTrigger
              key={day.value}
              value={day.value}
              className='hover:text-primary'
            >
              {day.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card className='border-none'>
          <CardHeader>
            <div className='flex justify-start items-center gap-2'>
              <CardTitle>Line Chart - Linear</CardTitle>
              {isLoading && <Loading className='h-6 w-6' />}
            </div>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className='min-h-[200px] w-full'
              config={chartConfig}
            >
              <LineChart
                accessibilityLayer
                data={coinPricesChartData}
                margin={{
                  left: 18,
                  right: 18,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='time'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  // tickFormatter={timeTickFormatter}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  domain={['dataMin', 'dataMax']}
                  dataKey={type}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => formatPriceUnit(value)}
                />
                <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                <Line
                  dataKey={type}
                  type='linear'
                  stroke='var(--color-price)'
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex-col items-start gap-2 text-sm'>
            <div className='flex gap-2 font-medium leading-none'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='leading-none text-muted-foreground'>
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </>
  );
};
export default PricesCharts;
