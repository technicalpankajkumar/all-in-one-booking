import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomPagination } from "./CustomPagination";

interface Column<T> {
  key: keyof T | string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalItems: number;

  // Optional callback (not required)
  onPageChange?: (page: number, pageSize: number) => void;

  initialPageSize?: number;
  showPagination?: boolean;
}

export function DynamicTable<T>({
  data,
  columns,
  totalItems,
  onPageChange,
  initialPageSize = 10,
  showPagination = true,
}: DynamicTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  // notify parent (optional)
  useEffect(() => {
    if (onPageChange) onPageChange(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
     
      {/* Pagination */}
      {showPagination && (
        <div className="border-t p-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            showPageSizeSelector
            showPageInfo
            showJumpToPage
            showFirstLastButtons
          />
        </div>
      )}
       <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              {columns.map((col) => (
                <TableHead key={String(col.key)} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              (data?.length > 0) && data?.map((row: any, idx) => (
                <TableRow key={idx} className="hover:bg-muted/20">
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={col.className}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
