"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";





interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}


export function BasicTable<T>({
  columns,
  data,
}:DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup?.id} className="border-none ">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-xl  text-black py-4 pl-6"
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows?.map((row, index) => {
              const rowClass =
                index % 2 === 0
                  ? "bg-[#FDF7F2] hover:bg-[#FDF7F2]"
                  : "bg-white hover:bg-white";
              return (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`text-[18px] border-none text-black ${rowClass}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell?.id} className="pl-6">
                      {flexRender(
                        cell.column.columnDef?.cell,
                        cell?.getContext()
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
      </Table>
     
   
  );
}

export default BasicTable;
