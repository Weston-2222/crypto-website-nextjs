'use client';
import 'client-only';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { formatNumberWithCommas } from '@/lib/utils';
import {
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
} from '@tabler/icons-react';
import MyTable from '@/components/mytable';
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
    return (
      <p className='flex items-center'>
        <span>{name}</span>
        <span>&nbsp;&nbsp;</span>
        <span className='text-gray-500'>{symbolUpper}</span>
      </p>
    );
  }

  const getCoinMasketsCapTableConfig =
    (): ColumnDef<CoinsMarketsApiResponse>[] => [
      {
        accessorKey: 'market_cap_rank',
        header: '市值排名',
      },
      {
        accessorKey: 'image',
        header: '',
        cell: (info: CellContext<CoinsMarketsApiResponse, unknown>) => {
          return (
            <Image
              src={info.getValue() as string}
              alt='Row Image'
              width={25}
              height={25}
              className='h-auto w-auto min-w-[25px] min-h-[25px]'
            />
          );
        },
      },
      {
        accessorKey: 'name_symbol',
        header: '貨幣',
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
      data={data}
      columns={getCoinMasketsCapTableConfig()}
      onRowClick={(info) => {
        router.push(`/coin/${info.id}`);
      }}
    />
  );
};
export default CoinMasketsCapTable;
