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
    <div className="overflow-x-auto rounded-[10px] my-4 p-4 shadow-md">
      <div className="">
        <h6 className="text-xl">Most Earning Restaurants</h6>
      </div>
      <hr className="my-4" />
      <Table className="w-full table-auto">
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
      <div className="py-4">
        <hr />
        <div className="flex justify-between items-center px-4 pt-3">
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
