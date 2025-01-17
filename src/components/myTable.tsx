'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type MyDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (info: T) => void;
  className?: string;
};

// 根據是否為表頭與是否是第一欄，回傳需要的 className（首欄固定）
const getStickyClassName = (isHeader: boolean, isFirstColumn: boolean) => {
  if (!isFirstColumn) return '';
  return isHeader ? 'sticky left-0 z-10 p-0 lg:px-4' : 'sticky left-0 z-10 p-0';
};

export default function MyTable<T>({
  data,
  columns,
  onRowClick,
  className,
}: MyDataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        'rounded-md border p-2 bg-gray-100 dark:bg-black',
        className
      )}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={getStickyClassName(true, index === 0)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800'
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={getStickyClassName(false, index === 0)}
                  >
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
