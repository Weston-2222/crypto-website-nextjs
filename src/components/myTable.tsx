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
  data: T[]; // 泛型數據
  columns: ColumnDef<T>[]; // 列定義
  onRowClick?: (info: T) => void;
  className?: string;
};
const MyTable = <T,>({
  data,
  columns,
  onRowClick,
  className,
}: MyDataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        'rounded-md border p-2  bg-gray-100 dark:bg-black',

        className
      )}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                let className = '';
                if (index === 0) {
                  className = 'sticky left-0 z-10 p-0 lg:px-4';
                }

                return (
                  <TableHead key={header.id} className={className}>
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
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200'
                >
                  {row.getVisibleCells().map((cell, index) => {
                    let className = '';
                    if (index === 0) {
                      className = 'sticky left-0 z-10 p-0';
                    }

                    return (
                      <TableCell
                        key={cell.id}
                        onClick={() => onRowClick?.(row.original)}
                        className={cn(className)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
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
};
export default MyTable;
