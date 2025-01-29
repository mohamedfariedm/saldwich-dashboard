'use client';

import { getColumns } from '@/app/shared/contacts/columns';
import ControlledTable from '@/components/controlled-table';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ContactsTable({
  text_tr,
  data = [],
  getSelectedColumns,
  getSelectedRowKeys,
  totalItems,
  permitions,
}: {
  text_tr?: any;
  permitions?: string[];
  data: any[];
  getSelectedColumns: React.Dispatch<React.SetStateAction<any[]>>;
  getSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
  totalItems: number;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [pageSize, setPageSize] = useState(Number(params.get('limit')));
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  console.log(data);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    handlePaginate,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleReset,
  } = useTable(data, pageSize);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        text_tr,
        permitions,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);
  useEffect(() => {
    getSelectedColumns(checkedColumns);
    getSelectedRowKeys(selectedRowKeys);
  }, [checkedColumns, selectedRowKeys]);

  return (
    <>
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: pageSize || 10,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
