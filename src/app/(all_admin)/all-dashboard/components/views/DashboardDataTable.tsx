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

import { Select } from "@/components/ui/select";
import { DialogDemo } from "@/app/(admin)/dashboard/components/shared/DialogDemo";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DashboardDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="rounded-[10px] w-full"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="py-8 px-6">
        <h6>Most Earning Restaurants</h6>
        
      </div>
      <hr className="" />
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none ">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-xl  text-black pt-4 pb-8 pl-6"
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
      </Table>
      <div className="py-10">
        <hr />
        <div className="flex justify-between items-center px-6 pt-5">
          <h6>Rows Per Page 10</h6>
          <div className="flex items-center gap-4">
            <GrFormPrevious className="w-6 h-6 text-black" />
            <h6>1</h6>
            <h6>2</h6>
            <GrFormNext className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDataTable;
