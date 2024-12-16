'use client';
import 'client-only';
import { CellContext } from '@tanstack/react-table';
import { CoinCategoriesApiResponse } from '@/types/api/coingecko/coinCategories';
import { ColumnDef } from '@tanstack/react-table';
import MyTable from '@/components/mytable';
import Image from 'next/image';
import MyPercent from '@/components/myPercent';
import { useRouter } from 'next/navigation';
const categoryTableConfig: ColumnDef<CoinCategoriesApiResponse>[] = [
  {
    accessorKey: 'name',
    header: '類別',
    cell: (info: CellContext<CoinCategoriesApiResponse, unknown>) => {
      return <span>{info.getValue() as string}</span>;
    },
  },
  {
    accessorKey: 'top_3_coins',
    header: 'top3',
    cell: (info: CellContext<CoinCategoriesApiResponse, unknown>) => {
      const urls = info.getValue() as string[];

      return (
        <div className='flex flex-row gap-2'>
          {urls.map((url) => {
            try {
              new URL(url);
            } catch {
              return <div key={url}></div>;
            }
            return (
              <Image
                key={url}
                src={url}
                alt='top3'
                width={20}
                height={20}
                className='h-auto w-auto'
              />
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'market_cap_change_24h',
    header: '24小時變化',
    cell: (info: CellContext<CoinCategoriesApiResponse, unknown>) => {
      return <MyPercent value={info.getValue() as number} />;
    },
  },
];
const CategoryTable = ({ data }: { data: CoinCategoriesApiResponse[] }) => {
  const router = useRouter();
  return (
    <MyTable<CoinCategoriesApiResponse>
      data={data}
      columns={categoryTableConfig}
      onRowClick={(info) => {
        router.push(`/category/${info.id}`);
      }}
    />
  );
};

export default CategoryTable;
