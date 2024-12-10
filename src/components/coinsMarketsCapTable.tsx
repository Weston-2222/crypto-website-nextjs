'use client';
import { useRouter } from 'next/navigation';
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
} from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { formatNumberWithCommas } from '@/lib/utils';

export function DataTable({ data }: { data: CoinsMarketsApiResponse[] }) {
  const columns: ColumnDef<CoinsMarketsApiResponse>[] = [
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
            className='rounded-md'
          />
        );
      },
    },
    {
      accessorKey: 'name_symbol',
      header: '貨幣',
      cell: (info: CellContext<CoinsMarketsApiResponse, unknown>) => {
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter(); // 使用 useRouter hook
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  router.push(`/coin/${row.original.id}`);
                }}
                className='cursor-pointer'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
