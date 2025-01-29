import { Button } from '@/components/ui/button';
import { HttpClient } from '@/framework/utils/request';
import { flatten } from 'flat';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

interface DataExportComponentProps {
  apiUrl: string;
  fileName?: string;
  defaultType?: 'excel' | 'pdf';
}

type ExportType = 'excel' | 'pdf';

interface DataItem {
  [key: string]: any;
}

type FlattenedDataItem = {
  [key: string]: string | number | boolean | null;
};

const DataExportComponent: React.FC<DataExportComponentProps> = ({
  apiUrl,
  fileName = 'exported_data',
  defaultType = 'excel',
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAndExportData = async (
    type: ExportType,
    fileName: string
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await HttpClient.get<DataItem[]>(apiUrl);
      const data = response.data;

      const flattenedData: FlattenedDataItem[] = data.map(
        (item: DataItem) =>
          flatten(item, { delimiter: ' ' }) as FlattenedDataItem
      );

      if (type === 'excel') {
        exportToExcel(flattenedData, fileName);
      } else if (type === 'pdf') {
        exportToPdf(flattenedData, fileName);
      }
    } catch (error) {
      console.error('Error fetching or exporting data:', error);
      toast.error('An error occurred while fetching or exporting data.');
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = (data: FlattenedDataItem[], fileName: string): void => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const maxWidth = 20;
    const columnWidths = Object.keys(data[0] || {}).map(() => ({
      wch: maxWidth,
    }));
    worksheet['!cols'] = columnWidths;

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const exportToPdf = (data: FlattenedDataItem[], fileName: string): void => {
    const doc = new jsPDF();
    const tableColumn = Object.keys(data[0] || {}).map((key) =>
      key.replace(/_/g, ' ')
    );
    const tableRows = data.map(Object.values);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      didDrawCell: (data: any) => {
        // No additional processing required for headers
      },
      styles: { overflow: 'linebreak', cellWidth: 'wrap' },
      columnStyles: { text: { cellWidth: 'auto' } },
    } as UserOptions);

    doc.save(`${fileName}.pdf`);
  };

  return (
    <div>
      <Button
        onClick={() => fetchAndExportData(defaultType, fileName)}
        disabled={isLoading}
        isLoading={isLoading}
      >
        {isLoading ? 'Exporting...' : `Export to ${defaultType.toUpperCase()}`}
      </Button>
    </div>
  );
};

export default DataExportComponent;
