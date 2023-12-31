import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';


interface PrintTableProps {
  componentRef: React.RefObject<any>; // Adjust the type accordingly
  columnsToPrint: string[]; // Specify the columns you want to print
}

const PrintTable: React.FC<PrintTableProps> = ({ componentRef, columnsToPrint }) => {
  // print table
  const handlePrint = useReactToPrint({
    content: () => {
      const clonedComponent = componentRef.current.cloneNode(true);

      // Remove styling and keep only the table structure
      clonedComponent.style = '';
      clonedComponent.querySelectorAll('*').forEach((el:any) => {
        el.removeAttribute('style');
      });

      // Hide columns that are not in the columnsToPrint array
    //   const allCells = clonedComponent.querySelectorAll('td, th');
    //   allCells.forEach((cell:any) => {
    //     const columnIndex = Array.from(cell.parentNode.children).indexOf(cell);
    //     if (columnIndex !== -1 && !columnsToPrint.includes(columnIndex.toString())) {
    //       cell.style.display = 'none';
    //     }
    //   });

      // Hide the ACTION column specifically (add a class to identify these cells)
      const actionColumnCells = clonedComponent.querySelectorAll('.action-column');
      actionColumnCells.forEach((cell:any) => {
        cell.style.display = 'none';
      });

      return clonedComponent;
    },
  });

  return (
    <Button
      onClick={handlePrint}
      className="bg-[#F57213] text-white  mb-10 ml-5"
    >
      Print
    </Button>
  );
};

export default PrintTable;
