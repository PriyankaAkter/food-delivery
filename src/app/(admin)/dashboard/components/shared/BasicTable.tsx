"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function BasicTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>

  
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none ">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-xl  text-black py-6 pl-6"
                  >
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
          {table && table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const rowClass =
                index % 2 === 0
                  ? "bg-[#FDF7F2] hover:bg-[#FDF7F2]"
                  : "bg-white hover:bg-white";
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`text-[18px] border-none text-black ${rowClass}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <div className="flex justify-between mt-20 items-center">
        <p>Show 10 in 30 items</p>
        <div className="mt-2 flex gap-2">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="bg-theme-gray px-4 py-3 hover:text-white hover:bg-secondary"
          >
            <IoIosArrowBack />
          </button>
          {/* <button
            onClick={() => table.setPageIndex(0)}
            className="bg-theme-gray px-4 py-3 hover:text-white hover:bg-secondary"
          >
            1
          </button>
          <button
            onClick={() => table.setPageIndex(1)}
            className="bg-theme-gray px-4 py-3 hover:text-white hover:bg-secondary"
          >
            2
          </button> */}

          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="bg-theme-gray px-4 py-3 hover:text-white hover:bg-secondary"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      </Table>
      
      </>
  );
}

export default BasicTable;
