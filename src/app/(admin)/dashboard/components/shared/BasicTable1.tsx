"use client";
import {
  useReactTable,

  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }

  const BasicTable1 = React.forwardRef<HTMLDivElement, DataTableProps<TData, TValue>>(({ data, columns }, ref) => {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
  
    const table = useReactTable({
      data: data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting: sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
    });
  
  
    return (
      <div className="w-full" ref={ref}>
        {/* <div>
          <input className="border border-secondary"
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div> */}
  
        <table className="w-full">
          <thead className="border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-xl text-center text-primary "
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="py-4 border-b-2"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header?.column?.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table && table
              ?.getRowModel()
              .rows.slice(0, 10)
              .map((row, index) => {
                const rowClass = index % 2 === 0 ? "bg-white" : "bg-[#FDF7F2] hover:bg-[#FDF7F2]";
                return (
                  <tr
                    key={row.id}
                    className={`text-[18px] text-center  ${rowClass} `}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="py-4 px-4 w-56 ">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex justify-between py-10 items-center px-6 print-hidden">
          <h6 className="text-base lg:text-xl">Rows per page 10 items</h6>
          <div className="mt-2 flex gap-2">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className="text-black px-4 py-3 "
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
              className="px-4 py-3 text-black "
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
  });
  
  export default BasicTable1;







