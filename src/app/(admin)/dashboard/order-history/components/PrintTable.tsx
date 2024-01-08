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
      // clonedComponent.style = '';
      // clonedComponent.querySelectorAll('*').forEach((el: any) => {
      //   el.removeAttribute('style');
      // });

      // Hide columns that are not in the columnsToPrint array
      const allRows = clonedComponent.querySelectorAll('tr');
      allRows.forEach((row: any) => {
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell: any, index: number) => {
          if (!columnsToPrint.includes(index.toString())) {
            cell.style.display = 'none';
          }
        });
      });

      return clonedComponent;
    },
  });

  return (
    <Button
      onClick={handlePrint}
      className="bg-[#F57213] text-white mb-10 ml-5"
    >
      Print
    </Button>
  );
};

export default PrintTable;
