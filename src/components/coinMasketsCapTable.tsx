'use client';
import 'client-only';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { cn, formatNumberWithCommas } from '@/lib/utils';
import {
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
} from '@tabler/icons-react';
import MyTable from '@/components/myTable';
import { useRouter } from 'next/navigation';

export const CoinMasketsCapTable = ({
  data,
}: {
  data: CoinsMarketsApiResponse[];
}) => {
  // 提取函數
  function renderNameSymbolCell(
    info: CellContext<CoinsMarketsApiResponse, unknown>
  ) {
    const name_symbol = info.getValue() as string;

    const [name, symbol] = name_symbol.split('_');
    const symbolUpper = symbol.toUpperCase();
    const backgroundColor = '';
    return (
      <div
        className={cn(
          'flex items-center bg-gray-100 dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent'
        )}
      >
        <span className={cn('p-4', backgroundColor)}>
          {info.row.original.market_cap_rank}
        </span>
        <Image
          src={info.row.original.image}
          alt='Row Image'
          width={25}
          height={25}
          className={cn(
            'h-auto w-auto min-w-[25px] min-h-[25px]',
            backgroundColor
          )}
        />
        <div
          className={cn(
            'flex flex-col lg:flex-row lg:items-center justify-start px-2',
            backgroundColor
          )}
        >
          <span className='lg:p-2'>{name}</span>
          <span className='text-gray-500'>{symbolUpper}</span>
        </div>
      </div>
    );
  }
  const newData = data.map((item) => {
    return {
      ...item,
      name_symbol: `${item.name}_${item.symbol}`,
    };
  });

  const getCoinMasketsCapTableConfig =
    (): ColumnDef<CoinsMarketsApiResponse>[] => [
      {
        accessorKey: 'name_symbol',
        header: () => (
          <p className='dark:bg-black bg-gray-100 inline-block p-4'>貨幣</p>
        ),
        cell: (info: CellContext<CoinsMarketsApiResponse, unknown>) => {
          return renderNameSymbolCell(info);
        },
      },
      {
        accessorKey: 'current_price',
        header: '價格',
        cell: (info: CellContext<CoinsMarketsApiResponse, unknown>) => {
          return (
            <span>USD${formatNumberWithCommas(info.getValue() as number)}</span>
          );
        },
      },
      {
        accessorKey: 'price_change_percentage_24h',
        header: '24小時漲幅',
        cell: (info: CellContext<CoinsMarketsApiResponse, unknown>) => {
          const value = info.getValue() as number;
          if (value < 0) {
            return (
              <div className='flex items-center gap-0.5 text-red-500'>
                <IconArrowBadgeDownFilled />
                <span>{value}%</span>
              </div>
            );
          } else {
            return (
              <div className='flex items-center gap-0.5 text-green-500'>
                <IconArrowBadgeUpFilled />
                <span>{value}%</span>
              </div>
            );
          }
        },
      },
      {
        accessorKey: 'market_cap',
        header: '市值',
        cell: (info: CellContext<CoinsMarketsApiResponse, unknown>) => {
          return (
            <span>USD${formatNumberWithCommas(info.getValue() as number)}</span>
          );
        },
      },
    ];
  const router = useRouter(); // 使用 useRouter hook
  return (
    <MyTable
      data={newData}
      columns={getCoinMasketsCapTableConfig()}
      onRowClick={(info) => {
        router.push(`/coin/${info.id}`);
      }}
    />
  );
};
export default CoinMasketsCapTable;
